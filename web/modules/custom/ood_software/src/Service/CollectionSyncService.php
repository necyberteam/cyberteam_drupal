<?php

namespace Drupal\ood_software\Service;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\node\NodeInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Exception\ParseException;

/**
 * Resolves Collections from GitHub repos.
 *
 * Each source repo is a Collection. appverse.yml at the repo root enriches
 * the Collection's metadata (title, description, maintainer, multi-app list);
 * when absent, the sync derives minimal metadata from the repo itself.
 */
class CollectionSyncService {

  protected LoggerInterface $logger;

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
    LoggerChannelFactoryInterface $loggerFactory,
    protected TimeInterface $time,
  ) {
    $this->logger = $loggerFactory->get('ood_software');
  }

  /**
   * Resolve or create the Collection for a repo.
   *
   * @param string $repoUrl
   *   GitHub repo URL (e.g., https://github.com/owner/name).
   * @param string|null $appverseYmlText
   *   The raw text of appverse.yml at repo root, or NULL if absent.
   * @param array $repoMetadata
   *   Metadata from GitHubService (organization name, description, default branch, etc.).
   *
   * @return \Drupal\node\NodeInterface
   *   The Collection node (newly created or updated).
   */
  public function resolveCollection(string $repoUrl, ?string $appverseYmlText, array $repoMetadata): NodeInterface {
    $collection = $this->loadCollectionByRepoUrl($repoUrl);

    if ($appverseYmlText !== NULL) {
      return $this->applyDeclared($collection, $repoUrl, $appverseYmlText, $repoMetadata);
    }
    return $this->applyInferred($collection, $repoUrl, $repoMetadata);
  }

  /**
   * Load a Collection by its repo URL, or NULL if not yet created.
   */
  protected function loadCollectionByRepoUrl(string $repoUrl): ?NodeInterface {
    $nodeStorage = $this->entityTypeManager->getStorage('node');
    $nids = $nodeStorage->getQuery()
      ->condition('type', 'appverse_collection')
      ->condition('field_collection_repo_url.uri', $repoUrl)
      ->range(0, 1)
      ->accessCheck(FALSE)
      ->execute();
    if (!$nids) {
      return NULL;
    }
    return $nodeStorage->load(reset($nids));
  }

  /**
   * Apply appverse.yml-derived metadata to a Collection node.
   */
  protected function applyDeclared(?NodeInterface $existing, string $repoUrl, string $appverseYmlText, array $repoMetadata): NodeInterface {
    try {
      $parsed = Yaml::parse($appverseYmlText);
    }
    catch (ParseException $e) {
      // Fatal: malformed appverse.yml. Mark stale_invalid and preserve
      // existing data if a Collection already exists.
      $node = $existing ?? $this->createBlankCollection($repoUrl);
      $node->set('field_collection_validation_st', 'stale_invalid');
      $node->set('field_collection_validation_er', [
        sprintf('appverse.yml: parse error — %s. Fix: validate YAML syntax at https://www.yamllint.com/', $this->sanitizeError($e->getMessage())),
      ]);
      $node->set('field_collection_last_synced', $this->time->getCurrentTime());
      $node->save();
      $this->logger->warning('Collection sync failed for @repo: malformed appverse.yml.', ['@repo' => $repoUrl]);
      return $node;
    }

    if (!is_array($parsed) || (count($parsed) > 0 && array_is_list($parsed))) {
      $node = $existing ?? $this->createBlankCollection($repoUrl);
      $node->set('field_collection_validation_st', 'stale_invalid');
      $node->set('field_collection_validation_er', [
        'appverse.yml: top-level must be a YAML mapping. Fix: ensure the file starts with `key: value` pairs, not a list or scalar.',
      ]);
      $node->set('field_collection_last_synced', $this->time->getCurrentTime());
      $node->save();
      return $node;
    }

    // Check schema version if declared.
    $minVersion = $parsed['appverse']['min_version'] ?? NULL;
    if ($minVersion !== NULL && version_compare($minVersion, '1.0', '>')) {
      $node = $existing ?? $this->createBlankCollection($repoUrl);
      $node->set('field_collection_validation_st', 'stale_invalid');
      $node->set('field_collection_validation_er', [
        sprintf('appverse.yml: appverse.min_version = "%s" but this catalog supports up to "1.0". Fix: upgrade the catalog or lower min_version.', $minVersion),
      ]);
      $node->set('field_collection_last_synced', $this->time->getCurrentTime());
      $node->save();
      return $node;
    }

    // Resolve title (declared, falling back to repo name).
    $title = $parsed['title'] ?? $this->deriveTitleFromRepoUrl($repoUrl);
    $description = $parsed['description'] ?? '';
    $maintainerName = $parsed['maintainer']['name'] ?? ($repoMetadata['organization'] ?? '');
    $maintainerSupport = $parsed['maintainer']['support_url'] ?? '';

    // Create or update the node.
    $node = $existing ?? $this->createBlankCollection($repoUrl);
    $node->setTitle($title);
    $node->set('field_collection_description', $description);
    $node->set('field_collection_repo_url', ['uri' => $repoUrl]);
    $node->set('field_collection_maintainer_name', $maintainerName);
    if ($maintainerSupport) {
      $node->set('field_collection_maintainer_url', ['uri' => $maintainerSupport]);
    }
    $node->set('field_collection_shared_paths', $parsed['shared_paths'] ?? []);
    $node->set('field_collection_validation_st', 'valid');
    $node->set('field_collection_validation_er', []);
    $node->set('field_collection_last_synced', $this->time->getCurrentTime());
    if (isset($repoMetadata['stars'])) {
      $node->set('field_collection_stars', (int) $repoMetadata['stars']);
    }
    if (isset($repoMetadata['lastCommittedDate'])) {
      $node->set('field_collection_last_commit', (int) $repoMetadata['lastCommittedDate']);
    }

    // Resolve organization taxonomy term from the GitHub repo owner
    // (match-only; no auto-create). The repo owner — not maintainer.name —
    // is the team/lab/center that owns the repo. maintainer.name is
    // typically a person (e.g. "Sean Anderson") and lives in
    // field_collection_maintainer_name above.
    // Always set — null'd when the repo owner isn't in the org vocab so
    // stale assignments clear.
    $repoOwner = $repoMetadata['organization'] ?? '';
    $org = $repoOwner ? $this->resolveOrganizationTerm($repoOwner) : NULL;
    $node->set('field_collection_organization', $org);

    // appverse.yml-derived collection-level fields.
    $websiteUrl = $parsed['website'] ?? '';
    if ($websiteUrl) {
      $node->set('field_collection_www_url', ['uri' => $websiteUrl]);
    }
    else {
      $node->set('field_collection_www_url', NULL);
    }

    $docsUrl = $parsed['docs'] ?? '';
    if ($docsUrl) {
      $node->set('field_collection_docs_url', ['uri' => $docsUrl]);
    }
    else {
      $node->set('field_collection_docs_url', NULL);
    }

    // Collection-level tags (case-insensitive match against existing tags
    // vocabulary; no auto-create — same approach as resolveOrganizationTerm).
    $tags = $parsed['tags'] ?? [];
    if (is_array($tags) && $tags) {
      $tagIds = [];
      foreach ($tags as $tagName) {
        if (!is_string($tagName)) {
          continue;
        }
        $tid = $this->resolveTagTerm(trim($tagName));
        if ($tid !== NULL) {
          $tagIds[] = $tid;
        }
      }
      $node->set('field_collection_tags', $tagIds);
    }
    else {
      $node->set('field_collection_tags', []);
    }

    if (isset($repoMetadata['readme'])) {
      $node->set('field_collection_readme', [
        'value' => $repoMetadata['readme'],
        'format' => 'markdown',
      ]);
    }

    $node->save();
    return $node;
  }

  /**
   * Walk the apps[] list from a parsed root appverse.yml and create/update
   * one appverse_app node per declared subpath.
   *
   * Per-app metadata is sourced from <path>/appverse.yml when present
   * (already fetched into $subpathFiles by the caller). Apps missing any
   * required field (name, description, app_type, maintainer.name,
   * maintainer.support_url) are flagged validation_st = rejected; siblings
   * are unaffected.
   *
   * Inline-at-root per-app data (spec §5) is not yet implemented — only
   * the <path>/appverse.yml-per-subpath style is supported here.
   *
   * @param \Drupal\node\NodeInterface $collection
   *   The parent Collection node (already saved).
   * @param array $parsedRootYml
   *   The full parsed root appverse.yml.
   * @param array<string, array{manifestYml: ?string, appverseYml: ?string}> $subpathFiles
   *   Per-subpath manifest.yml + appverse.yml text, keyed by path.
   * @param string $repoUrl
   *   The Collection's repo URL.
   * @param array $repoMetadata
   *   Metadata from GitHubService (used to thread the repo owner down to
   *   applyDeclaredApp so per-app organization terms resolve from the
   *   GitHub owner rather than the per-app maintainer.name).
   *
   * @return \Drupal\node\NodeInterface[]
   *   The created/updated app nodes, keyed by subpath.
   */
  public function applyDeclaredApps(NodeInterface $collection, array $parsedRootYml, array $subpathFiles, string $repoUrl, array $repoMetadata = []): array {
    $appsList = $parsedRootYml['apps'] ?? [];
    if (!is_array($appsList)) {
      return [];
    }

    $result = [];
    foreach ($appsList as $entry) {
      if (!is_array($entry) || empty($entry['path'])) {
        continue;
      }
      $subpath = trim((string) $entry['path'], '/');
      if ($subpath === '') {
        continue;
      }

      $files = $subpathFiles[$subpath] ?? ['manifestYml' => NULL, 'appverseYml' => NULL];
      $appNode = $this->resolveAppNode($repoUrl, $subpath);
      $this->applyDeclaredApp($appNode, $collection, $subpath, $files, $repoUrl, $repoMetadata);
      $result[$subpath] = $appNode;
    }
    return $result;
  }

  /**
   * Load an app node by (repo URL, subpath), or create a blank one.
   */
  protected function resolveAppNode(string $repoUrl, string $subpath): NodeInterface {
    $nodeStorage = $this->entityTypeManager->getStorage('node');
    $nids = $nodeStorage->getQuery()
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_github_url.uri', $repoUrl)
      ->condition('field_appverse_app_subpath', $subpath)
      ->range(0, 1)
      ->accessCheck(FALSE)
      ->execute();
    if ($nids) {
      return $nodeStorage->load(reset($nids));
    }
    return $nodeStorage->create([
      'type' => 'appverse_app',
      'title' => $subpath,
      'field_appverse_github_url' => ['uri' => $repoUrl],
      'field_appverse_app_subpath' => $subpath,
      'status' => 1,
      // appverse_app uses content moderation; default 'draft' would leave
      // the node unpublished and absent from the cache. Sync-created apps
      // are intended to be public from the moment they pass validation.
      'moderation_state' => 'published',
    ]);
  }

  /**
   * Populate per-app fields from <path>/appverse.yml + <path>/manifest.yml.
   *
   * Required fields: name, description, app_type, maintainer.name,
   * maintainer.support_url. If any are missing, mark validation_st =
   * rejected and skip writing optional fields.
   */
  protected function applyDeclaredApp(NodeInterface $app, NodeInterface $collection, string $subpath, array $files, string $repoUrl, array $repoMetadata = []): void {
    $perAppYml = NULL;
    if (!empty($files['appverseYml'])) {
      try {
        $perAppYml = Yaml::parse($files['appverseYml']);
      }
      catch (ParseException $e) {
        $perAppYml = NULL;
      }
    }
    if (!is_array($perAppYml)) {
      $perAppYml = [];
    }

    // Fallback to manifest.yml's name + description if per-app appverse.yml
    // omits them.
    $manifestYml = NULL;
    if (!empty($files['manifestYml'])) {
      try {
        $manifestYml = Yaml::parse($files['manifestYml']);
      }
      catch (ParseException $e) {
        $manifestYml = NULL;
      }
    }
    if (!is_array($manifestYml)) {
      $manifestYml = [];
    }

    $name = $perAppYml['name'] ?? ($manifestYml['name'] ?? '');
    $description = $perAppYml['description'] ?? ($manifestYml['description'] ?? '');
    $appType = $perAppYml['app_type'] ?? NULL;
    $maintainerName = $perAppYml['maintainer']['name'] ?? '';
    $maintainerSupport = $perAppYml['maintainer']['support_url'] ?? '';

    $missing = [];
    if (!$name) {
      $missing[] = 'name';
    }
    if (!$description) {
      $missing[] = 'description';
    }
    if (!$appType) {
      $missing[] = 'app_type';
    }
    if (!$maintainerName) {
      $missing[] = 'maintainer.name';
    }
    if (!$maintainerSupport) {
      $missing[] = 'maintainer.support_url';
    }

    if ($missing) {
      $app->setTitle($name ?: $subpath);
      $app->set('field_appverse_collection', $collection->id());
      $app->set('field_appverse_app_subpath', $subpath);
      $app->set('field_appverse_app_validation_st', 'rejected');
      // Per spec §5: never silently delist. Previously-good content
      // (README, tags, organization, maintainer) stays in place when an
      // app flips to rejected, so the listing degrades gracefully rather
      // than vanishing. Once required fields are restored, the next sync
      // re-validates and rewrites those fields normally.
      $this->logger->warning(
        'App at @repo / @path rejected: missing required fields: @missing',
        ['@repo' => $repoUrl, '@path' => $subpath, '@missing' => implode(', ', $missing)]
      );
      $app->save();
      return;
    }

    // Happy path — write all fields.
    $app->setTitle($name);
    $app->set('body', [
      'value' => $description,
      'format' => 'markdown',
    ]);
    $app->set('field_appverse_collection', $collection->id());
    $app->set('field_appverse_app_subpath', $subpath);
    $app->set('field_appverse_app_validation_st', 'valid');

    // App type — match-only against the appverse_app_type vocab.
    $appTypeTid = $this->resolveAppTypeTerm((string) $appType);
    if ($appTypeTid !== NULL) {
      $app->set('field_appverse_app_type', [$appTypeTid]);
    }

    // Per-app tags — match-only against the tags vocabulary.
    // Always set — empty list when YAML omits tags so removed tags clear.
    $tags = $perAppYml['tags'] ?? [];
    $tagIds = [];
    if (is_array($tags)) {
      foreach ($tags as $tagName) {
        if (!is_string($tagName)) {
          continue;
        }
        $tid = $this->resolveTagTerm(trim($tagName));
        if ($tid !== NULL) {
          $tagIds[] = $tid;
        }
      }
    }
    $app->set('field_add_implementation_tags', $tagIds);

    // Organization term — match-only against appverse_organization, keyed
    // off the GitHub repo owner (the team/lab/center that owns the repo),
    // not the per-app maintainer.name (typically a person).
    // Always set — null'd when the repo owner isn't in the org vocab so
    // stale assignments clear.
    $repoOwner = $repoMetadata['organization'] ?? '';
    $orgTid = $repoOwner ? $this->resolveOrganizationTerm($repoOwner) : NULL;
    $app->set('field_appverse_organization', $orgTid);

    // Per-app maintainer name — the person/team responsible for this app
    // (distinct from the repo-owning organization above).
    // Always set — empty string when YAML doesn't declare a maintainer, so
    // removed data clears rather than persisting stale.
    $app->set('field_appverse_maintainer_name', $maintainerName);

    // Per-app README — fetched from <path>/README.md by GitHubService.
    // Always set — null'd when the repo's per-path README is missing or
    // empty, so removed READMEs clear rather than persisting stale.
    if (!empty($files['readme'])) {
      $app->set('field_appverse_readme', [
        'value' => $files['readme'],
        'format' => 'markdown',
      ]);
    }
    else {
      $app->set('field_appverse_readme', NULL);
    }

    $app->save();
  }

  /**
   * Match an existing app_type term by name; match-only.
   *
   * Matches by name; case-insensitivity depends on the database collation
   * (MySQL's default *_ci collations match case-insensitively, which is
   * what we rely on here).
   */
  protected function resolveAppTypeTerm(string $name): ?int {
    if ($name === '') {
      return NULL;
    }
    $termStorage = $this->entityTypeManager->getStorage('taxonomy_term');
    $tids = $termStorage->getQuery()
      ->condition('vid', 'appverse_app_type')
      ->condition('name', $name, 'LIKE')
      ->range(0, 1)
      ->accessCheck(FALSE)
      ->execute();
    if (!$tids) {
      return NULL;
    }
    return (int) reset($tids);
  }

  /**
   * Create a new, unsaved Collection node bound to a repo URL.
   */
  protected function createBlankCollection(string $repoUrl): NodeInterface {
    return $this->entityTypeManager->getStorage('node')->create([
      'type' => 'appverse_collection',
      'title' => $this->deriveTitleFromRepoUrl($repoUrl),
      'field_collection_repo_url' => ['uri' => $repoUrl],
      'field_collection_validation_st' => 'valid',
      'status' => 1,
    ]);
  }

  /**
   * Derive a fallback Collection title from a GitHub repo URL.
   */
  protected function deriveTitleFromRepoUrl(string $repoUrl): string {
    $parsed = parse_url($repoUrl);
    $path = trim($parsed['path'] ?? '', '/');
    $segments = explode('/', $path);
    return end($segments) ?: $repoUrl;
  }

  /**
   * Match an existing organization taxonomy term by name.
   *
   * Matches by name; case-insensitivity depends on the database collation
   * (MySQL's default *_ci collations match case-insensitively, which is
   * what we rely on here).
   *
   * Phase 1 decision: match-only, no auto-create. Auto-creating organization
   * terms from raw maintainer strings pollutes the vocab with typos and case
   * variants ("CHPC" vs "Chpc"). Curators add new organization terms
   * explicitly through the existing taxonomy admin UI; the sync then picks
   * them up on the next pass. Unmatched maintainer strings leave
   * field_collection_organization NULL — the Collection still functions; it
   * just isn't filterable by org until an admin adds the term and re-runs
   * the sync.
   */
  protected function resolveOrganizationTerm(string $name): ?int {
    $termStorage = $this->entityTypeManager->getStorage('taxonomy_term');
    $tids = $termStorage->getQuery()
      ->condition('vid', 'appverse_organization')
      ->condition('name', $name, 'LIKE')
      ->range(0, 1)
      ->accessCheck(FALSE)
      ->execute();
    if (!$tids) {
      return NULL;
    }
    return (int) reset($tids);
  }

  /**
   * Sanitize an error message before storing it in a public field.
   *
   * Strips absolute file paths and stack traces; caps length.
   */
  protected function sanitizeError(string $message): string {
    $clean = preg_replace('@/[^\s:]+@', '<path>', $message);
    return mb_substr($clean, 0, 200);
  }

  /**
   * Apply minimal repo-derived metadata to a Collection node when appverse.yml is absent.
   */
  protected function applyInferred(?NodeInterface $existing, string $repoUrl, array $repoMetadata): NodeInterface {
    $node = $existing ?? $this->createBlankCollection($repoUrl);

    $title = $repoMetadata['name'] ?? $this->deriveTitleFromRepoUrl($repoUrl);
    $description = $repoMetadata['description'] ?? '';
    $maintainerName = $repoMetadata['organization'] ?? '';

    $node->setTitle($title);
    $node->set('field_collection_description', $description);
    $node->set('field_collection_repo_url', ['uri' => $repoUrl]);
    if ($maintainerName) {
      $node->set('field_collection_maintainer_name', $maintainerName);
    }
    // Organization term comes from the GitHub repo owner, not the
    // maintainer string (which may be a person rather than an org).
    $repoOwner = $repoMetadata['organization'] ?? '';
    if ($repoOwner) {
      $org = $this->resolveOrganizationTerm($repoOwner);
      if ($org !== NULL) {
        $node->set('field_collection_organization', $org);
      }
    }
    // Inferred Collections start valid; they roll up to degraded only if a
    // child app is rejected (app-level rejection lands in phase 3).
    $node->set('field_collection_validation_st', 'valid');
    $node->set('field_collection_validation_er', []);
    $node->set('field_collection_last_synced', $this->time->getCurrentTime());
    if (isset($repoMetadata['stars'])) {
      $node->set('field_collection_stars', (int) $repoMetadata['stars']);
    }
    if (isset($repoMetadata['lastCommittedDate'])) {
      $node->set('field_collection_last_commit', (int) $repoMetadata['lastCommittedDate']);
    }
    if (isset($repoMetadata['readme'])) {
      $node->set('field_collection_readme', [
        'value' => $repoMetadata['readme'],
        'format' => 'markdown',
      ]);
    }
    $node->save();
    return $node;
  }

  /**
   * Match an existing tag taxonomy term by name.
   *
   * Matches by name; case-insensitivity depends on the database collation
   * (MySQL's default *_ci collations match case-insensitively, which is
   * what we rely on here).
   *
   * Match-only — does not auto-create. Tags must exist in the `tags`
   * vocabulary before they can be assigned to a Collection.
   */
  protected function resolveTagTerm(string $name): ?int {
    $termStorage = $this->entityTypeManager->getStorage('taxonomy_term');
    $tids = $termStorage->getQuery()
      ->condition('vid', 'tags')
      ->condition('name', $name, 'LIKE')
      ->range(0, 1)
      ->accessCheck(FALSE)
      ->execute();
    if (!$tids) {
      return NULL;
    }
    return (int) reset($tids);
  }

}
