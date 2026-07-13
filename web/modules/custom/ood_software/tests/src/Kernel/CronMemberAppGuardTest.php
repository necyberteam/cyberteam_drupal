<?php

declare(strict_types=1);

namespace Drupal\Tests\ood_software\Kernel;

use Drupal\Core\Config\FileStorage;
use Drupal\KernelTests\KernelTestBase;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Drupal\ood_software\Plugin\GitHubService;
use Drupal\ood_software\Plugin\QueueWorker\AppverseAppUpdater;
use Drupal\ood_software\Service\RepoSyncService;

/**
 * Guards that the cron app-updater does NOT clobber monorepo member apps.
 *
 * AppverseAppUpdater reads ROOT-level repo data and, when the repo has new
 * commits, writes body/README/app_type onto the app. A monorepo member app
 * gets those fields from its OWN subpath (owned by RepoSyncService), so the
 * worker must skip that write for any app with a non-empty
 * field_appverse_app_subpath. Without the guard the member's per-subpath body
 * is overwritten with root (often empty) content.
 *
 * @group ood_software
 */
class CronMemberAppGuardTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'system',
    'user',
    'node',
    'field',
    'text',
    'filter',
    'options',
    'datetime',
    'link',
    'taxonomy',
    'path',
    'path_alias',
    'content_moderation',
    'workflows',
    'key',
    'flag',
    'ood_software',
  ];

  use Traits\ProdConfigTrait;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->installEntitySchema('user');
    $this->installEntitySchema('node');
    $this->installEntitySchema('taxonomy_term');
    $this->installEntitySchema('content_moderation_state');
    $this->installEntitySchema('path_alias');
    $this->installSchema('node', ['node_access']);
    $this->installConfig([
      'system', 'filter', 'user', 'node', 'taxonomy',
      'content_moderation', 'workflows',
    ]);

    $this->importProdConfig([
      'node.type.appverse_repo',
      'node.type.appverse_app',
      'workflows.workflow.appverse_editorial',
      'field.storage.node.field_repo_url',
      'field.field.node.appverse_repo.field_repo_url',
      'field.storage.node.field_appverse_repo',
      'field.field.node.appverse_app.field_appverse_repo',
      'field.field.node.appverse_app.body',
      'field.storage.node.field_appverse_github_url',
      'field.field.node.appverse_app.field_appverse_github_url',
      'field.storage.node.field_appverse_app_subpath',
      'field.field.node.appverse_app.field_appverse_app_subpath',
      'field.storage.node.field_appverse_readme',
      'field.field.node.appverse_app.field_appverse_readme',
      'field.storage.node.field_appverse_lastupdated',
      'field.field.node.appverse_app.field_appverse_lastupdated',
      'field.storage.node.field_appverse_stars',
      'field.field.node.appverse_app.field_appverse_stars',
      'field.storage.node.field_appverse_app_type',
      'field.field.node.appverse_app.field_appverse_app_type',
    ]);

    // field_repo_shape lives in the module's config/install.
    $moduleSource = new FileStorage(
      DRUPAL_ROOT . '/modules/custom/ood_software/config/install'
    );
    foreach ([
      'field.storage.node.field_repo_shape',
      'field.field.node.appverse_repo.field_repo_shape',
    ] as $name) {
      $data = $moduleSource->read($name);
      $etm = \Drupal::entityTypeManager();
      $storage = $etm->getStorage(
        \Drupal::service('config.manager')->getEntityTypeIdByName($name)
      );
      $idKey = $storage->getEntityType()->getKey('id');
      if (!($data[$idKey] ?? NULL) || !$storage->load($data[$idKey])) {
        $storage->createFromStorageRecord($data)->save();
      }
    }
  }

  /**
   * Build the worker with a stubbed GitHubService reporting a NEW commit.
   */
  private function makeWorker(NodeInterface $repo): AppverseAppUpdater {
    $gh = new class(
      $this->container->get('http_client'),
      $this->container->get('key.repository'),
      $this->container->get('messenger'),
      $this->container->get('logger.factory'),
      $this->container->get('entity_type.manager'),
    ) extends GitHubService {

      public function parseUrl($repo) {
        return TRUE;
      }

      public function getData() {}

      // A last-committed date that will differ from the app's stored
      // lastupdated, so the "new commits" branch is entered.
      public function getLastComittedDate() {
        return '2000000000';
      }

      // Root data — what would clobber a member app if the guard is absent.
      public function getDescription() {
        return 'ROOT DESCRIPTION';
      }

      public function getReadme() {
        return 'ROOT README';
      }

      public function getAppTypeIds(): array {
        return [];
      }

      public function getStars() {
        return 0;
      }

      public function getRepoUrl(): string {
        return 'https://github.com/OSC/mono';
      }

      public function getRepoName() {
        return 'mono';
      }

      public function getRepoDescription(): string {
        return '';
      }

      public function getOrganization() {
        return '';
      }

      public function getAppverseYmlText(): ?string {
        return NULL;
      }
    };

    // Stub resolveRepo to return the existing repo (no network / sync).
    $repoSync = new class($repo) extends RepoSyncService {

      private NodeInterface $repo;

      public function __construct(NodeInterface $repo) {
        $this->repo = $repo;
      }

      public function resolveRepo(string $repoUrl, ?string $appverseYmlText, array $repoMetadata): NodeInterface {
        return $this->repo;
      }

    };

    return new AppverseAppUpdater(
      [], 'appverse_app_updater', [],
      $this->container->get('entity_type.manager'),
      $gh,
      $repoSync,
    );
  }

  private function makeRepo(): NodeInterface {
    $repo = Node::create([
      'type' => 'appverse_repo',
      'title' => 'Mono',
      'field_repo_url' => ['uri' => 'https://github.com/OSC/mono'],
      'field_repo_shape' => 'declared',
      'moderation_state' => 'published',
    ]);
    $repo->save();
    return $repo;
  }

  /**
   * A member app (has a subpath) keeps its per-subpath body after cron.
   */
  public function testMemberAppBodyNotClobbered(): void {
    $repo = $this->makeRepo();
    $app = Node::create([
      'type' => 'appverse_app',
      'title' => 'Member',
      'field_appverse_repo' => $repo->id(),
      'field_appverse_app_subpath' => 'jupyter',
      'field_appverse_github_url' => ['uri' => 'https://github.com/OSC/mono'],
      'body' => [['format' => 'markdown', 'value' => 'PER-SUBPATH BODY']],
      'field_appverse_lastupdated' => [['value' => '1000']],
      'moderation_state' => 'published',
    ]);
    $app->save();

    $this->makeWorker($repo)->processItem(['nid' => $app->id()]);

    $reloaded = Node::load($app->id());
    self::assertSame(
      'PER-SUBPATH BODY',
      $reloaded->get('body')->value,
      'Member app body must NOT be clobbered with root content by cron.'
    );
  }

  /**
   * A non-member app (no subpath) still gets root content synced (control).
   */
  public function testNonMemberAppBodyStillSynced(): void {
    $repo = $this->makeRepo();
    $app = Node::create([
      'type' => 'appverse_app',
      'title' => 'Standalone',
      'field_appverse_repo' => $repo->id(),
      // No subpath — this app's content DOES come from the repo root.
      'field_appverse_github_url' => ['uri' => 'https://github.com/OSC/mono'],
      'body' => [['format' => 'markdown', 'value' => 'OLD BODY']],
      'field_appverse_lastupdated' => [['value' => '1000']],
      'moderation_state' => 'published',
    ]);
    $app->save();

    $this->makeWorker($repo)->processItem(['nid' => $app->id()]);

    $reloaded = Node::load($app->id());
    self::assertSame(
      'ROOT DESCRIPTION',
      $reloaded->get('body')->value,
      'Standalone (no-subpath) app SHOULD receive root content on new commits.'
    );
  }

}
