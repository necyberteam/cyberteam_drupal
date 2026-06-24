<?php

namespace Drupal\ood_software\Controller;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Component\Utility\UrlHelper;
use Drupal\content_moderation\ModerationInformationInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\node\NodeInterface;
use Drupal\user\UserInterface;
use Drupal\ood_software\Service\RepoSyncService;
use Drupal\ood_software\Plugin\GitHubService;

/**
 * Controller for the Appverse Maintenance Hub action routes.
 *
 * Handles Re-sync, publish/unpublish toggles, moderation transitions
 * (send-for-review and admin publish), and legacy-path redirects.
 */
final class AppverseHubController extends ControllerBase {

  public function __construct(
    protected RepoSyncService $repoSync,
    protected GitHubService $github,
    protected TimeInterface $time,
    protected ModerationInformationInterface $moderationInformation,
    protected RequestStack $requestStack,
  ) {}

  public static function create(ContainerInterface $container): self {
    return new self(
      $container->get('ood_software.repo_sync'),
      $container->get('ood_software.gh'),
      $container->get('datetime.time'),
      $container->get('content_moderation.moderation_information'),
      $container->get('request_stack'),
    );
  }

  /**
   * Access callback: owner of the node, or admin.
   *
   * Used by routes that contributors can act on for their own content.
   */
  public function ownerOrAdminAccess(AccountInterface $account, NodeInterface $node): AccessResult {
    if ($account->hasPermission('administer appverse content')) {
      return AccessResult::allowed()->cachePerUser()->addCacheableDependency($node);
    }
    if ($account->id() == $node->getOwnerId()) {
      return AccessResult::allowed()->cachePerUser()->addCacheableDependency($node);
    }
    return AccessResult::forbidden('Only the owner or an admin may act on this node.')
      ->cachePerUser()
      ->addCacheableDependency($node);
  }

  /**
   * Re-sync a Collection from GitHub.
   *
   * Route: POST /appverse/repo/{node}/resync
   *
   * Behavior contract (matches spec):
   *  - On success: refreshed Collection saved by the service; status
   *    message reports apps-refreshed + apps-removed counts.
   *  - On failure: field_repo_validation_st='stale_invalid'; error
   *    appended to field_repo_validation_er (capped at last 10);
   *    field_repo_last_synced still updated.
   */
  public function resync(NodeInterface $node): RedirectResponse {
    if ($node->bundle() !== 'appverse_repo') {
      throw new \InvalidArgumentException('Resync requires an appverse_repo node.');
    }

    $repoUrl = $node->get('field_repo_url')->first()?->getValue()['uri'] ?? NULL;
    if (empty($repoUrl)) {
      $this->messenger()->addError($this->t('Cannot re-sync: this Repo has no repo URL.'));
      return $this->redirectToHub();
    }

    // Snapshot existing member-app count before sync for the
    // "N apps refreshed, M removed" message.
    $beforeAppIds = $this->entityTypeManager()->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_repo', $node->id())
      ->execute();
    $appsBefore = count($beforeAppIds);

    try {
      if (!$this->github->parseUrl($repoUrl)) {
        throw new \RuntimeException('Repo URL is invalid.');
      }
      // parseUrl() already calls fetchRepoData() internally.

      $repoMetadata = [
        'stars' => $this->github->getStars(),
        'lastCommittedDate' => $this->github->getLastComittedDate(),
        'organization' => $this->github->getOrganization(),
        'description' => $this->github->getDescription(),
        'readme' => $this->github->getReadme(),
        'license' => $this->github->getLicense(),
        'licenseLink' => $this->github->getLicenseLink(),
        'isArchived' => $this->github->getIsArchived(),
      ];

      $appverseYml = $this->github->getAppverseYmlText();

      // Detect a shape-change before sync: if the existing Collection is
      // declared (had appverse.yml) but the repo no longer has it, the
      // Collection morphs to inferred shape. Warn the user — this isn't
      // an error but it's a significant state change worth highlighting.
      $existingShape = $node->get('field_repo_shape')->value ?? NULL;
      if ($existingShape === 'declared' && empty($appverseYml)) {
        $this->messenger()->addWarning($this->t(
          '@title is morphing from a Declared Repo to an Inferred (single-app) Repo — the repo no longer has appverse.yml. If this is unintentional, revert the appverse.yml change in your repo and re-sync.',
          ['@title' => $node->label()]
        ));
      }

      $parsedRootYml = $appverseYml !== NULL ? (\Symfony\Component\Yaml\Yaml::parse($appverseYml) ?: []) : [];
      _ood_software_resync_repo_batch((int) $node->id(), $repoUrl, $appverseYml, $repoMetadata, is_array($parsedRootYml) ? $parsedRootYml : []);

      // Reload the Collection — service saved updated fields, in-memory
      // $node is stale. The service's applyDeclared/applyInferred
      // already clear field_repo_validation_er (= []), set
      // field_repo_validation_st='valid', and update
      // field_repo_last_synced on success, so the controller
      // doesn't need to write those fields here — only in the catch
      // block below.
      $fresh = $this->entityTypeManager()->getStorage('node')->load($node->id());
      $afterAppIds = $this->entityTypeManager()->getStorage('node')->getQuery()
        ->accessCheck(FALSE)
        ->condition('type', 'appverse_app')
        ->condition('field_appverse_repo', $node->id())
        ->execute();
      $appsAfter = count($afterAppIds);
      $appsRemoved = max(0, $appsBefore - $appsAfter);

      $title = $fresh ? $fresh->label() : $node->label();
      $freshValidationSt = $fresh ? ($fresh->get('field_repo_validation_st')->value ?? NULL) : NULL;

      if ($freshValidationSt === 'stale_invalid') {
        // applyDeclared hit an early-return validation branch (parse error,
        // non-mapping yaml, bad min_version). The Collection is marked
        // stale_invalid; no apps were refreshed.
        $this->messenger()->addError($this->t(
          'Re-sync of @title failed validation. See the Repo node for details.',
          ['@title' => $title]
        ));
      }
      else {
        $this->messenger()->addStatus($this->t(
          'Re-synced @title — @after apps refreshed, @removed removed.',
          ['@title' => $title, '@after' => $appsAfter, '@removed' => $appsRemoved]
        ));
      }
    }
    catch (\Throwable $e) {
      $now = $this->time->getCurrentTime();

      // Read existing error strings (string_long multi-value field).
      $existingErrors = [];
      if ($node->hasField('field_repo_validation_er')) {
        foreach ($node->get('field_repo_validation_er') as $item) {
          $value = $item->value ?? NULL;
          if (is_string($value) && $value !== '') {
            $existingErrors[] = $value;
          }
        }
      }
      $existingErrors[] = sprintf('[%s] %s', date('Y-m-d H:i:s', $now), $e->getMessage());
      // Cap to last 10 so the field doesn't grow without bound.
      $existingErrors = array_slice($existingErrors, -10);

      $node->set('field_repo_validation_st', 'stale_invalid');
      // string_long multi-value: each entry needs the {value: '...'}
      // wrapper, matching the format used elsewhere in the sync service.
      $node->set('field_repo_validation_er', array_map(
        fn($msg) => ['value' => $msg],
        $existingErrors
      ));
      $node->set('field_repo_last_synced', $now);
      $node->save();

      $this->messenger()->addError($this->t('Re-sync failed: @msg', ['@msg' => $e->getMessage()]));
    }

    return $this->redirectToHub();
  }

  /**
   * Toggle a Collection's publish state.
   *
   * Route: POST /appverse/repo/{node}/unpublish
   *
   * Contributors can unpublish; only admins can republish.
   */
  public function toggleRepoPublish(NodeInterface $node): RedirectResponse {
    if ($node->bundle() !== 'appverse_repo') {
      throw new \InvalidArgumentException('Expected an appverse_repo node.');
    }

    $currentlyPublished = (bool) $node->isPublished();
    $isAdmin = $this->currentUser()->hasPermission('administer appverse content');

    if ($currentlyPublished) {
      // Unpublish: allowed for owner or admin.
      // appverse_collection uses content_moderation. setUnpublished()
      // alone won't stick because the workflow forces status from
      // moderation_state on save. Drive via the moderation field instead.
      $response = $this->applyTransition(
        $node,
        'draft',
        $this->t('Unpublished @title.', ['@title' => $node->label()])
      );
      // After successful unpublish, cascade-drop member apps to draft so
      // they don't outlive their parent in the catalog. Symmetric with
      // cascadePublishToMemberApps on first publish.
      $verify = $this->entityTypeManager()->getStorage('node')->loadUnchanged($node->id());
      if ($verify && $verify->get('moderation_state')->value === 'draft') {
        $this->cascadeUnpublishMemberApps($verify);
      }
      return $response;
    }
    else {
      // Republish: admin only.
      // NOTE: this route's access callback (ownerOrAdminAccess) allows
      // owner-or-admin to invoke it. The asymmetric admin-only republish
      // rule is enforced HERE in the controller body, not at the route
      // level, because contributors CAN call this endpoint to unpublish
      // their own Collections (just not republish them).
      if (!$isAdmin) {
        $this->messenger()->addError($this->t('Only an admin can republish a Repo.'));
        return $this->redirectToHub();
      }
      return $this->applyTransition(
        $node,
        'published',
        $this->t('Published @title.', ['@title' => $node->label()])
      );
    }
  }

  /**
   * Toggle an App's publish state.
   *
   * Route: POST /appverse/app/{node}/unpublish
   *
   * Contributors can toggle App-level state both ways within a published
   * Collection. When the parent Collection is unpublished, the App-level
   * toggle still works but the cache cascade hides the App until the
   * Collection is republished.
   */
  public function toggleAppPublish(NodeInterface $node): RedirectResponse {
    if ($node->bundle() !== 'appverse_app') {
      throw new \InvalidArgumentException('Expected an appverse_app node.');
    }

    // App-level toggle when parent Collection is unpublished — no
    // visible effect because the cache cascade hides the App
    // regardless. Allow the toggle (it's the user's data) but warn.
    $parent = $node->get('field_appverse_repo')->entity ?? NULL;
    if ($parent && !$parent->isPublished()) {
      $this->messenger()->addWarning($this->t(
        '@title is in an unpublished Repo — App-level status has no effect on visibility until the Repo is republished.',
        ['@title' => $node->label()]
      ));
    }

    // appverse_app uses content_moderation. setPublished() alone won't
    // stick because the workflow forces status from moderation_state on
    // save. Drive the toggle via the moderation field instead: publish
    // → 'published', unpublish → 'draft'.
    $wasPublished = $node->isPublished();
    $newState = $wasPublished ? 'draft' : 'published';
    $message = $wasPublished
      ? $this->t('Unpublished @title.', ['@title' => $node->label()])
      : $this->t('Published @title.', ['@title' => $node->label()]);
    return $this->applyTransition($node, $newState, $message);
  }

  /**
   * Trigger a content_moderation transition on a Collection or App.
   *
   * Centralizes the workflow API call so all four transition routes
   * share one implementation. The transition's role permissions are
   * enforced by Drupal's content_moderation module — this method does
   * the access check (owner-or-admin) on the node itself, then lets
   * content_moderation refuse if the role lacks the transition.
   *
   * Implementation note: this uses the direct field-set approach
   * (set('moderation_state', $newState) + save()). That works because
   * content_moderation's pre-save hooks intercept the save and validate
   * the transition. If smoke-testing reveals that transition guards
   * aren't firing, fall back to the explicit transition API via the
   * Workflow entity's type plugin.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The Collection or App to transition.
   * @param string $newState
   *   Target moderation state.
   * @param \Drupal\Core\StringTranslation\TranslatableMarkup $statusMessage
   *   User-facing message on success. Pre-translated at the call site so
   *   potx string extraction sees a literal.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   */
  protected function applyTransition(NodeInterface $node, string $newState, \Drupal\Core\StringTranslation\TranslatableMarkup $statusMessage): RedirectResponse {
    if (!$node->hasField('moderation_state')) {
      $this->messenger()->addError($this->t('This content type has no moderation workflow.'));
      return $this->redirectToHub();
    }

    try {
      // Pick the right source revision so content_moderation routes the
      // transition correctly:
      //  - When the target state is non-published (draft / archived /
      //    needs_adjustment / ready_for_review): transition the DEFAULT
      //    revision. Saving from a forward-draft revision produces
      //    another forward draft and never demotes the published default.
      //  - When the target state is published: transition the LATEST
      //    revision so any in-flight draft edits are what get published.
      $storage = $this->entityTypeManager()->getStorage('node');
      $workflow = $this->moderationInformation->getWorkflowForEntity($node);
      $isPublishedTarget = $workflow && $workflow->getTypePlugin()
        ->getState($newState)->isPublishedState();

      if ($isPublishedTarget) {
        $latestVid = $storage->getLatestRevisionId($node->id());
        $fresh = $latestVid
          ? $storage->loadRevision($latestVid)
          : $storage->loadUnchanged($node->id());
      }
      else {
        $fresh = $storage->loadUnchanged($node->id());
      }
      $fresh->set('moderation_state', $newState);
      $fresh->setNewRevision(TRUE);
      // Clear the validation-required flag that content_moderation can set on
      // a moderation_state transition. We aren't going through a form here, so
      // there's no #validate chain that would call $fresh->validate() — and
      // Drupal 10.2+ throws EntityStorageException when save() runs with
      // validationRequired=TRUE but no recent validate(). The transition is
      // gated upstream (workflow permission check + custom_access route
      // requirement); skipping the implicit re-validate is safe here.
      if (method_exists($fresh, 'setValidationRequired')) {
        $fresh->setValidationRequired(FALSE);
      }
      $fresh->save();

      // Verify against the default revision: the canonical row is what
      // determines whether the node is published in queries and the catalog.
      $verify = $storage->loadUnchanged($node->id());
      $actualState = $verify->get('moderation_state')->value;
      if ($actualState !== $newState) {
        $this->messenger()->addError($this->t(
          'Transition refused: @title is still in @actual state. The workflow may not permit this move from @from to @to.',
          [
            '@title' => $verify->label(),
            '@actual' => $actualState,
            '@from' => $node->get('moderation_state')->value,
            '@to' => $newState,
          ]
        ));
      }
      else {
        $this->messenger()->addStatus($statusMessage);
      }
    }
    catch (\Throwable $e) {
      $this->messenger()->addError($this->t('Transition failed: @msg', ['@msg' => $e->getMessage()]));
    }

    return $this->redirectToHub();
  }

  /**
   * Contributor action: send for review.
   *
   * Routes: POST /appverse/repo/{node}/send-for-review
   *         POST /appverse/app/{node}/send-for-review
   *
   * The existing `send_for_review` workflow transition covers BOTH:
   * - draft → ready_for_review (initial submission)
   * - needs_adjustment → ready_for_review (resubmit after admin feedback)
   *
   * Allowed for owner or admin.
   */
  public function sendForReview(NodeInterface $node): RedirectResponse {
    return $this->applyTransition(
      $node,
      'ready_for_review',
      $this->t('Sent @title for review.', ['@title' => $node->label()])
    );
  }

  /**
   * Admin action: publish a Collection or App.
   *
   * Routes: POST /appverse/repo/{node}/publish
   *         POST /appverse/app/{node}/publish
   *
   * Allowed only for users with 'administer appverse content' permission
   * (gated by adminOnlyAccess on the route).
   *
   * Cascade rule: on a Collection's FIRST publish (no prior revision in
   * the published state), this method also publishes every member App
   * still in draft / ready_for_review / needs_adjustment. Subsequent
   * republishes of a Collection that was previously published do NOT
   * cascade — apps are managed individually by then.
   */
  public function adminPublish(NodeInterface $node): RedirectResponse {
    // Detect first-publish BEFORE the transition runs.
    $isFirstPublish = $node->bundle() === 'appverse_repo'
      && $this->isFirstPublishOfCollection($node);

    $response = $this->applyTransition(
      $node,
      'published',
      $this->t('Published @title.', ['@title' => $node->label()])
    );

    // Only cascade on a successful first publish.
    if ($isFirstPublish) {
      $verify = $this->entityTypeManager()->getStorage('node')->loadUnchanged($node->id());
      if ($verify && $verify->get('moderation_state')->value === 'published') {
        $this->cascadePublishToMemberApps($verify);
      }
    }

    return $response;
  }

  /**
   * Check whether this Collection has never been in the 'published' state.
   *
   * Walks the revision log; returns TRUE if no prior revision had
   * moderation_state='published'. The current revision's state isn't
   * checked (we're called before applyTransition runs).
   */
  protected function isFirstPublishOfCollection(NodeInterface $collection): bool {
    $vids = $this->entityTypeManager()->getStorage('node')->revisionIds($collection);
    foreach ($vids as $vid) {
      $rev = $this->entityTypeManager()->getStorage('node')->loadRevision($vid);
      if ($rev && $rev->hasField('moderation_state') && $rev->get('moderation_state')->value === 'published') {
        return FALSE;
      }
    }
    return TRUE;
  }

  /**
   * Cascade-publish every member App in a non-published moderation state.
   *
   * Only used on a Collection's first publish, per the cascade rule
   * documented on adminPublish().
   */
  protected function cascadePublishToMemberApps(NodeInterface $collection): void {
    $cascadeStates = ['draft', 'ready_for_review', 'needs_adjustment'];
    $memberAppIds = $this->entityTypeManager()->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_repo', $collection->id())
      ->execute();

    $count = 0;
    foreach ($this->entityTypeManager()->getStorage('node')->loadMultiple($memberAppIds) as $app) {
      if (!$app->hasField('moderation_state')) {
        continue;
      }
      $state = $app->get('moderation_state')->value;
      if (!in_array($state, $cascadeStates, TRUE)) {
        continue;
      }
      $app->set('moderation_state', 'published');
      $app->setNewRevision(TRUE);
      $app->setRevisionLogMessage('Auto-published via parent Repo first-publish.');
      if (method_exists($app, 'setValidationRequired')) {
        $app->setValidationRequired(FALSE);
      }
      $app->save();
      $count++;
    }

    if ($count > 0) {
      $this->messenger()->addStatus($this->t(
        'Also published @count member apps under @title.',
        ['@count' => $count, '@title' => $collection->label()]
      ));
    }
  }

  /**
   * Cascade-drop all currently-published member apps to draft.
   *
   * Mirror of cascadePublishToMemberApps. Triggered when a Collection
   * transitions out of 'published' so member apps don't outlive their
   * parent in the catalog (the catalog filters by status; an orphan
   * "published" app would still appear).
   */
  protected function cascadeUnpublishMemberApps(NodeInterface $collection): void {
    $memberAppIds = $this->entityTypeManager()->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_repo', $collection->id())
      ->condition('status', 1)
      ->execute();

    $count = 0;
    foreach ($this->entityTypeManager()->getStorage('node')->loadMultiple($memberAppIds) as $app) {
      if (!$app->hasField('moderation_state')) {
        continue;
      }
      $app->set('moderation_state', 'draft');
      $app->setNewRevision(TRUE);
      $app->setRevisionLogMessage('Auto-unpublished via parent Repo.');
      if (method_exists($app, 'setValidationRequired')) {
        $app->setValidationRequired(FALSE);
      }
      $app->save();
      $count++;
    }

    if ($count > 0) {
      $this->messenger()->addStatus($this->t(
        'Also unpublished @count member apps under @title.',
        ['@count' => $count, '@title' => $collection->label()]
      ));
    }
  }

  /**
   * Admin-only access callback for publish + request_adjustment routes.
   */
  public function adminOnlyAccess(AccountInterface $account, NodeInterface $node): AccessResult {
    return AccessResult::allowedIfHasPermission($account, 'administer appverse content')
      ->cachePerUser()
      ->addCacheableDependency($node);
  }

  /**
   * Redirect /user/{user}/my-apps → /user/{user}/my-appverse.
   */
  public function redirectFromLegacy(UserInterface $user): RedirectResponse {
    return new RedirectResponse('/user/' . $user->id() . '/my-appverse', 301);
  }

  /**
   * Redirect /appverse/manage-apps → /appverse/manage-repos.
   */
  public function redirectFromLegacyManageApps(): RedirectResponse {
    return new RedirectResponse('/appverse/manage-repos', 301);
  }

  /**
   * Redirect back to whichever hub display the action came from.
   *
   * Honors Drupal's standard `destination` query param so an admin
   * acting on /appverse/manage-repos returns there, while a
   * contributor acting on their own hub returns to their own URL.
   * Falls back to the user's own hub if no destination is present.
   *
   * Defense against open-redirect:
   *  - Reject any externally-resolving URL (UrlHelper::isExternal).
   *  - Reject paths containing `..` (relative-path escapes).
   *  - Use strict prefix matching with a terminating char so
   *    `/appverse/manage-repos-evil` doesn't pass.
   */
  protected function redirectToHub(): RedirectResponse {
    $request = $this->requestStack->getCurrentRequest();
    $destination = $request->query->get('destination');

    if (is_string($destination) && $destination !== '') {
      // Reject if Drupal classifies as external (covers protocol-relative
      // URLs, absolute http(s) URLs, etc.).
      if (!UrlHelper::isExternal($destination)) {
        // Reject any path containing `..` to block relative-path escapes.
        if (!str_contains($destination, '..')) {
          // Strict prefix matching: the allowed prefix must be followed by
          // `/`, `?`, `#`, or end-of-string.
          $allowedPrefixes = [
            '/user/',
            '/appverse/manage-repos',
          ];
          foreach ($allowedPrefixes as $prefix) {
            if ($destination === $prefix || str_starts_with($destination, $prefix . '/') || str_starts_with($destination, $prefix . '?') || str_starts_with($destination, $prefix . '#')) {
              return new RedirectResponse($destination);
            }
            // Special case: the /user/ prefix is itself the terminator
            // (e.g. /user/123/my-appverse).
            if ($prefix === '/user/' && str_starts_with($destination, $prefix)) {
              return new RedirectResponse($destination);
            }
          }
        }
      }
    }

    $uid = $this->currentUser()->id();
    return new RedirectResponse('/user/' . $uid . '/my-appverse');
  }

}
