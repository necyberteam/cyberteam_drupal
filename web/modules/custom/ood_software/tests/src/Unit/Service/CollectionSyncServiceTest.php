<?php

namespace Drupal\Tests\ood_software\Unit\Service;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\node\NodeInterface;
use Drupal\Tests\UnitTestCase;
use Drupal\ood_software\Service\CollectionSyncService;
use Psr\Log\LoggerInterface;

/**
 * Unit tests for CollectionSyncService::applyDeclared edge cases.
 *
 * @group ood_software
 *
 * @coversDefaultClass \Drupal\ood_software\Service\CollectionSyncService
 */
class CollectionSyncServiceTest extends UnitTestCase {

  /**
   * Mock node storage that records all create() and save() calls.
   */
  protected EntityStorageInterface $nodeStorage;

  /**
   * The service under test.
   */
  protected CollectionSyncService $service;

  /**
   * The mock node that resolveCollection returns.
   */
  protected NodeInterface $node;

  /**
   * Captured field sets on the node for assertion in each test.
   *
   * @var array<string, mixed>
   */
  protected array $nodeFields = [];

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->nodeFields = [];

    // Mock the node. set() captures the field name + value into $nodeFields,
    // save() is a no-op, setTitle() goes through set('title', ...).
    $this->node = $this->createMock(NodeInterface::class);
    $this->node->method('set')
      ->willReturnCallback(function (string $field, $value) {
        $this->nodeFields[$field] = $value;
        return $this->node;
      });
    $this->node->method('setTitle')
      ->willReturnCallback(function (string $title) {
        $this->nodeFields['title'] = $title;
        return $this->node;
      });
    // SAVED_NEW = 1 (defined in Drupal core, not autoloaded in unit tests).
    $this->node->method('save')->willReturn(1);
    $this->node->method('id')->willReturn(1);

    // Query mock — always returns empty (no existing Collection found).
    $query = $this->createMock(QueryInterface::class);
    $query->method('condition')->willReturnSelf();
    $query->method('range')->willReturnSelf();
    $query->method('accessCheck')->willReturnSelf();
    $query->method('execute')->willReturn([]);

    // Node storage mock: getQuery returns the query above; create() returns
    // the prepared $node; load*() returns null/empty.
    $this->nodeStorage = $this->createMock(EntityStorageInterface::class);
    $this->nodeStorage->method('getQuery')->willReturn($query);
    $this->nodeStorage->method('create')->willReturn($this->node);
    $this->nodeStorage->method('load')->willReturn(NULL);
    $this->nodeStorage->method('loadMultiple')->willReturn([]);

    // Term storage mock — also returns no matches.
    $termStorage = $this->createMock(EntityStorageInterface::class);
    $termQuery = $this->createMock(QueryInterface::class);
    $termQuery->method('condition')->willReturnSelf();
    $termQuery->method('range')->willReturnSelf();
    $termQuery->method('accessCheck')->willReturnSelf();
    $termQuery->method('execute')->willReturn([]);
    $termStorage->method('getQuery')->willReturn($termQuery);

    // EntityTypeManager: dispatches by entity type ID.
    $entityTypeManager = $this->createMock(EntityTypeManagerInterface::class);
    $entityTypeManager->method('getStorage')->willReturnCallback(
      function (string $entity_type) use ($termStorage) {
        return $entity_type === 'taxonomy_term' ? $termStorage : $this->nodeStorage;
      }
    );

    // Logger.
    $logger = $this->createMock(LoggerInterface::class);
    $loggerFactory = $this->createMock(LoggerChannelFactoryInterface::class);
    $loggerFactory->method('get')->willReturn($logger);

    // Time service is now injected via constructor (PHPStan flagged
    // \Drupal::time() calls as needing DI; service signature updated).
    $time = $this->createMock(\Drupal\Component\Datetime\TimeInterface::class);
    $time->method('getCurrentTime')->willReturn(1234567890);

    // GitHubService is injected for software resolution (Phase 1.7 Task 5).
    // These tests don't exercise the multi-app per-app sync path, so a bare
    // mock is fine; the few methods needed (resolveSoftwareForApp) aren't
    // called from applyDeclared (the Collection-level path under test).
    $githubService = $this->createMock(\Drupal\ood_software\Plugin\GitHubService::class);

    $this->service = new CollectionSyncService($entityTypeManager, $loggerFactory, $time, $githubService);
  }

  /**
   * Well-formed appverse.yml with all keys → status valid; all fields populated.
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredHappyPath(): void {
    $yml = <<<YAML
appverse:
  min_version: "1.0"

title: Happy Path Collection
description: A happy-path test collection.

website: https://example.org
docs: https://docs.example.org

maintainer:
  name: Test Maintainer
  support_url: https://example.org/support

tags:
  - simulation

shared_paths:
  - app-templates/
YAML;

    $this->service->resolveCollection('https://github.com/test/happy', $yml, ['organization' => 'Test Org']);

    $this->assertSame('Happy Path Collection', $this->nodeFields['title'] ?? NULL);
    $this->assertSame('A happy-path test collection.', $this->nodeFields['field_collection_description'] ?? NULL);
    $this->assertSame('valid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
    $this->assertSame([], $this->nodeFields['field_collection_validation_er'] ?? NULL);
  }

  /**
   * Malformed YAML → ParseException is caught; status stale_invalid; error populated.
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredMalformedYaml(): void {
    $yml = 'title: [unclosed';

    $this->service->resolveCollection('https://github.com/test/malformed', $yml, []);

    $this->assertSame('stale_invalid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
    $this->assertIsArray($this->nodeFields['field_collection_validation_er'] ?? NULL);
    $this->assertNotEmpty($this->nodeFields['field_collection_validation_er']);
    $this->assertStringContainsString('parse error', $this->nodeFields['field_collection_validation_er'][0]);
  }

  /**
   * Top-level YAML list (e.g. "- foo") → status stale_invalid with mapping-required error.
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredTopLevelList(): void {
    $yml = "- not a mapping\n- another item";

    $this->service->resolveCollection('https://github.com/test/list-top', $yml, []);

    $this->assertSame('stale_invalid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
    $errors = $this->nodeFields['field_collection_validation_er'] ?? [];
    $this->assertNotEmpty($errors);
    $this->assertStringContainsString('YAML mapping', $errors[0]);
  }

  /**
   * Scalar top-level YAML → status stale_invalid.
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredScalarTopLevel(): void {
    $yml = 'just-a-string';

    $this->service->resolveCollection('https://github.com/test/scalar', $yml, []);

    $this->assertSame('stale_invalid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
  }

  /**
   * Empty YAML (parses to NULL) → status stale_invalid.
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredEmptyInput(): void {
    $this->service->resolveCollection('https://github.com/test/empty', '', []);

    $this->assertSame('stale_invalid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
  }

  /**
   * Future schema version (min_version > 1.0) → stale_invalid with version error.
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredFutureSchemaVersion(): void {
    $yml = <<<YAML
appverse:
  min_version: "2.0"

title: Future Collection
YAML;

    $this->service->resolveCollection('https://github.com/test/future', $yml, []);

    $this->assertSame('stale_invalid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
    $errors = $this->nodeFields['field_collection_validation_er'] ?? [];
    $this->assertNotEmpty($errors);
    $this->assertStringContainsString('min_version', $errors[0]);
  }

  /**
   * Missing maintainer block in YAML falls back to repoMetadata.organization for the
   * maintainer name string (sync still derives display name).
   *
   * @covers ::applyDeclared
   */
  public function testApplyDeclaredFallsBackToRepoOrg(): void {
    $yml = <<<YAML
title: No Maintainer Block
description: Demo
YAML;

    $this->service->resolveCollection('https://github.com/test/no-maintainer', $yml, ['organization' => 'Fallback Org']);

    // Title parses fine, maintainer name falls back to the repo owner string,
    // status remains valid.
    $this->assertSame('No Maintainer Block', $this->nodeFields['title'] ?? NULL);
    $this->assertSame('Fallback Org', $this->nodeFields['field_collection_maintainer_name'] ?? NULL);
    $this->assertSame('valid', $this->nodeFields['field_collection_validation_st'] ?? NULL);
  }

}
