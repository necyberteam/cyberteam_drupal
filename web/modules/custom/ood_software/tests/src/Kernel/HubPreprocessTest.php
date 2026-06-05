<?php

declare(strict_types=1);

namespace Drupal\Tests\ood_software\Kernel;

use Drupal\Core\Config\FileStorage;
use Drupal\KernelTests\KernelTestBase;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Drupal\Tests\ood_software\Kernel\Traits\ProdConfigTrait;
use Drupal\Tests\user\Traits\UserCreationTrait;

/**
 * Unit-level guard for the maintenance-hub card data builder.
 *
 * Exercises _ood_software_build_hub_row() — the function that turns an
 * appverse_repo node (plus its member apps) into the structured `hub` array
 * the appverse-hub.html.twig template renders.
 *
 * @group ood_software
 */
class HubPreprocessTest extends KernelTestBase {

  use ProdConfigTrait;
  use UserCreationTrait;

  protected static $modules = [
    'system', 'user', 'node', 'field', 'text', 'filter', 'options',
    'datetime', 'link', 'taxonomy', 'path', 'path_alias',
    'content_moderation', 'workflows', 'key', 'flag', 'ood_software',
  ];

  protected function setUp(): void {
    parent::setUp();
    $this->installEntitySchema('user');
    $this->installEntitySchema('node');
    $this->installEntitySchema('taxonomy_term');
    $this->installEntitySchema('content_moderation_state');
    $this->installEntitySchema('path_alias');
    $this->installSchema('node', ['node_access']);
    $this->installSchema('flag', ['flag_counts']);
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
      'field.storage.node.field_repo_validation_st',
      'field.field.node.appverse_repo.field_repo_validation_st',
      'field.storage.node.field_repo_last_synced',
      'field.field.node.appverse_repo.field_repo_last_synced',
      'field.storage.node.field_appverse_software_implemen',
      'field.field.node.appverse_app.field_appverse_software_implemen',
      'field.storage.node.field_appverse_app_subpath',
      'field.field.node.appverse_app.field_appverse_app_subpath',
    ]);
    // field_repo_shape lives in module config/install.
    $moduleSource = new FileStorage(
      DRUPAL_ROOT . '/modules/custom/ood_software/config/install'
    );
    $configManager = \Drupal::service('config.manager');
    $etm = \Drupal::entityTypeManager();
    foreach ([
      'field.storage.node.field_repo_shape',
      'field.field.node.appverse_repo.field_repo_shape',
    ] as $name) {
      $data = $moduleSource->read($name);
      if ($data === FALSE) {
        throw new \RuntimeException("Missing ood_software install config: $name");
      }
      $storage = $etm->getStorage($configManager->getEntityTypeIdByName($name));
      $idKey = $storage->getEntityType()->getKey('id');
      if (!empty($data[$idKey]) && $storage->load($data[$idKey])) {
        continue;
      }
      $storage->createFromStorageRecord($data)->save();
    }
    \Drupal::moduleHandler()->loadInclude('ood_software', 'module');

    // Burn uid 1. Drupal's uid-1 superuser bypasses every permission check, so
    // any admin user created in a test would falsely satisfy
    // hasPermission('administer appverse content') regardless of the gate.
    // Reserving uid 1 here makes the permission gate genuinely exercised in
    // every test that creates an "admin" user.
    $this->createUser();
  }

  /**
   * Helper: create a published appverse_repo with the given shape.
   */
  private function makeRepo(array $values = []): NodeInterface {
    $repo = Node::create([
      'type' => 'appverse_repo',
      'title' => $values['title'] ?? 'Example Repo',
      'field_repo_shape' => $values['shape'] ?? 'inferred',
      'field_repo_url' => ['uri' => $values['url'] ?? 'https://github.com/example/repo'],
      'field_repo_last_synced' => $values['last_synced'] ?? 1717000000,
      'field_repo_validation_st' => $values['validation_st'] ?? 'valid',
      'moderation_state' => $values['moderation_state'] ?? 'published',
    ]);
    $repo->save();
    return $repo;
  }

  /**
   * Helper: create a member appverse_app under a repo.
   */
  private function makeApp(NodeInterface $repo, array $values = []): NodeInterface {
    $app = Node::create([
      'type' => 'appverse_app',
      'title' => $values['title'] ?? 'Example App',
      'field_appverse_repo' => $repo->id(),
      'field_appverse_app_subpath' => $values['subpath'] ?? 'sub',
      'moderation_state' => $values['moderation_state'] ?? 'published',
    ]);
    $app->save();
    return $app;
  }

  public function testCoreRepoFields(): void {
    $repo = $this->makeRepo([
      'title' => 'RStudio Server',
      'shape' => 'inferred',
      'url' => 'https://github.com/osc/bc_rstudio',
    ]);
    $hub = _ood_software_build_hub_row($repo);

    $this->assertSame('RStudio Server', $hub['title']);
    $this->assertSame('Repo', (string) $hub['label']);
    $this->assertFalse($hub['is_monorepo']);
    $this->assertTrue($hub['is_inferred']);
    $this->assertSame('https://github.com/osc/bc_rstudio', $hub['github_url']);
    $this->assertStringStartsWith('/appverse/#/repo/', $hub['catalog_url']);
    $this->assertSame('published', $hub['moderation_state']);
    $this->assertSame('success', $hub['status']['modifier']);
    $this->assertSame('Published', (string) $hub['status']['label']);
  }

  public function testBadgeMappingForEveryState(): void {
    $expected = [
      'published' => ['Published', 'success'],
      'ready_for_review' => ['Awaiting review', 'warning'],
      'needs_adjustment' => ['Needs changes', 'error'],
      'draft' => ['Draft', 'muted'],
      'archived' => ['Archived', 'muted'],
    ];
    foreach ($expected as $state => [$label, $modifier]) {
      $badge = _ood_software_hub_badge($state);
      $this->assertSame($modifier, $badge['modifier'], "modifier for $state");
      $this->assertSame($label, (string) $badge['label'], "label for $state");
    }
  }

  public function testMonorepoAppsArray(): void {
    $repo = $this->makeRepo(['title' => 'Mono', 'shape' => 'declared']);
    $this->makeApp($repo, ['title' => 'bc_jupyter', 'subpath' => 'jupyter_example']);
    $this->makeApp($repo, ['title' => 'bc_rstudio', 'subpath' => 'rstudio_example']);

    $hub = _ood_software_build_hub_row($repo);

    $this->assertTrue($hub['is_monorepo']);
    $this->assertSame('Monorepo', (string) $hub['label']);
    $this->assertCount(2, $hub['apps']);
    // Sorted by title: bc_jupyter first.
    $this->assertSame('bc_jupyter', $hub['apps'][0]['title']);
    $this->assertSame('jupyter_example', $hub['apps'][0]['subpath']);
    // No software ref set → null (template renders em-dash).
    $this->assertNull($hub['apps'][0]['software']);
    // Declared repo → no per-app edit link even if can_edit.
    $this->assertNull($hub['apps'][0]['edit_url']);
  }

  public function testSingleAppRepoHasNoAppsTable(): void {
    $repo = $this->makeRepo(['title' => 'Solo', 'shape' => 'inferred']);
    $this->makeApp($repo, ['title' => 'solo_app']);

    $hub = _ood_software_build_hub_row($repo);

    // One member app, but inferred single-app repos render header-only.
    $this->assertFalse($hub['is_monorepo']);
    $this->assertSame([], $hub['apps']);
  }

  public function testInferredRepoHeaderEditLink(): void {
    // Admin reviewing ANOTHER user's repo (the real owner-block scenario).
    $contributor = $this->createUser([], 'repo_contributor');
    $admin = $this->createUser(['administer appverse content', 'bypass node access']);
    \Drupal::currentUser()->setAccount($admin);

    $repo = $this->makeRepo(['shape' => 'inferred']);
    $repo->setOwnerId($contributor->id())->save();
    $hub = _ood_software_build_hub_row($repo);
    $this->assertSame('/node/' . $repo->id() . '/edit', $hub['edit_url']);
    $this->assertTrue($hub['is_admin']);
    $this->assertNotNull($hub['owner']);
    $this->assertStringStartsWith('/community-persona/', $hub['owner']['persona_url']);
  }

  public function testAdminSeesOwnerBlockEvenOnOwnRepo(): void {
    // On the Manage page a reviewer should see the owner of every repo,
    // including repos they own themselves — so the owner block is NOT
    // suppressed for the current user (it is permission-gated, not owner-gated).
    $admin = $this->createUser(['administer appverse content', 'bypass node access']);
    \Drupal::currentUser()->setAccount($admin);

    $repo = $this->makeRepo(['shape' => 'inferred']);
    $repo->setOwnerId($admin->id())->save();
    $hub = _ood_software_build_hub_row($repo);
    $this->assertTrue($hub['is_admin']);
    $this->assertNotNull($hub['owner']);
    $this->assertSame('/community-persona/' . $admin->id(), $hub['owner']['persona_url']);
  }

  public function testDeclaredRepoHasNoHeaderEditLink(): void {
    $admin = $this->createUser(['administer appverse content', 'bypass node access']);
    \Drupal::currentUser()->setAccount($admin);

    $repo = $this->makeRepo(['shape' => 'declared']);
    $hub = _ood_software_build_hub_row($repo);
    $this->assertNull($hub['edit_url']);
  }

  public function testNonAdminHasNoOwnerBlock(): void {
    // Default kernel user is anonymous/non-admin.
    $repo = $this->makeRepo();
    $hub = _ood_software_build_hub_row($repo);
    $this->assertFalse($hub['is_admin']);
    $this->assertNull($hub['owner']);
  }

  public function testValidationIssuesSurfaced(): void {
    $repo = $this->makeRepo(['validation_st' => 'degraded']);
    $hub = _ood_software_build_hub_row($repo);
    $this->assertTrue($hub['has_validation_issues']);

    $ok = $this->makeRepo(['validation_st' => 'valid']);
    $this->assertFalse(_ood_software_build_hub_row($ok)['has_validation_issues']);
  }

  public function testContributorActionSetDraft(): void {
    // Non-admin owner of a draft repo: sees resync + send_for_review, not publish.
    // (uid 1 is burned in setUp(), so this user is genuinely non-admin.)
    $owner = $this->createUser([], 'contributor');
    \Drupal::currentUser()->setAccount($owner);

    $repo = $this->makeRepo(['moderation_state' => 'draft']);
    $repo->setOwnerId($owner->id())->save();

    $hub = _ood_software_build_hub_row($repo);
    $this->assertNotNull($hub['actions']['send_for_review']);
    $this->assertNull($hub['actions']['publish']);
    $this->assertNull($hub['actions']['request_changes']);
    $this->assertNotNull($hub['actions']['resync']);
  }

  public function testNonAdminGetsNoAdminActions(): void {
    // An authenticated non-admin (no 'administer appverse content') must NOT
    // get the admin lifecycle actions on a ready_for_review repo. This proves
    // the gate isn't too broad (e.g. granted to any authenticated user).
    $user = $this->createUser([], 'plain_user');
    \Drupal::currentUser()->setAccount($user);

    $repo = $this->makeRepo(['moderation_state' => 'ready_for_review']);
    $hub = _ood_software_build_hub_row($repo);

    $this->assertFalse($hub['is_admin']);
    $this->assertNull($hub['actions']['publish']);
    $this->assertNull($hub['actions']['request_changes']);
    $this->assertNull($hub['actions']['delete']);
  }

  public function testAdminActionSetReadyForReview(): void {
    $admin = $this->createUser(['administer appverse content', 'bypass node access']);
    \Drupal::currentUser()->setAccount($admin);

    $repo = $this->makeRepo(['moderation_state' => 'ready_for_review']);
    $hub = _ood_software_build_hub_row($repo);

    $this->assertNotNull($hub['actions']['publish']);
    $this->assertNotNull($hub['actions']['request_changes']);
    $this->assertNotNull($hub['actions']['delete']);
    $this->assertNull($hub['actions']['send_for_review']);
  }

  public function testPublishedRepoOffersUnpublish(): void {
    $admin = $this->createUser(['administer appverse content', 'bypass node access']);
    \Drupal::currentUser()->setAccount($admin);
    $repo = $this->makeRepo(['moderation_state' => 'published']);
    $hub = _ood_software_build_hub_row($repo);
    $this->assertNotNull($hub['actions']['unpublish']);
    $this->assertNull($hub['actions']['publish']);
  }

  public function testCacheMetadata(): void {
    $owner = $this->createUser([], 'repo_owner');
    $repo = $this->makeRepo(['shape' => 'declared']);
    $repo->setOwnerId($owner->id())->save();
    $app = $this->makeApp($repo, ['title' => 'a']);
    $this->makeApp($repo, ['title' => 'b']);

    $meta = _ood_software_hub_cache_meta($repo);
    $this->assertContains('node:' . $repo->id(), $meta['tags']);
    $this->assertContains('node:' . $app->id(), $meta['tags']);
    // The admin owner block renders the owner USER entity, so its tag must be
    // a dependency or a renamed/re-emailed owner won't invalidate the card.
    $this->assertContains('user:' . $owner->id(), $meta['tags']);
    $this->assertContains('user.permissions', $meta['contexts']);
    $this->assertContains('user', $meta['contexts']);
  }

}
