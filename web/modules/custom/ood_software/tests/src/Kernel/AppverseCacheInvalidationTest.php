<?php

namespace Drupal\Tests\ood_software\Kernel;

use Drupal\KernelTests\KernelTestBase;
use Drupal\ood_software\Service\AppverseCacheService;

/**
 * @group ood_software
 * @coversDefaultClass \Drupal\ood_software\Service\AppverseCacheService
 */
class AppverseCacheInvalidationTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   *
   * Minimal set: these tests exercise only the dirty-flag/flush semantics and
   * subscriber registration, NOT cache file output. If you later add an
   * assertion that calls generate() and inspects appverse-data.json, you'll
   * need the fuller module set used by SyncInferredMemberAppTest (field, text,
   * taxonomy, file, media, content_moderation, workflows, etc.).
   */
  protected static $modules = ['ood_software', 'node', 'user', 'system', 'key'];

  /**
   * The cache service under test.
   */
  protected AppverseCacheService $cache;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->cache = $this->container->get('ood_software.appverse_cache');
  }

  /**
   * flushIfDirty() is a no-op (returns FALSE) when nothing marked it dirty.
   *
   * @covers ::flushIfDirty
   */
  public function testFlushIsNoOpWhenClean(): void {
    $this->assertFalse($this->cache->flushIfDirty(), 'A clean cache should not flush.');
  }

  /**
   * markDirty() then flushIfDirty() runs exactly one regeneration.
   *
   * @covers ::markDirty
   * @covers ::flushIfDirty
   */
  public function testMarkThenFlushRunsOnce(): void {
    $this->cache->markDirty();
    $this->assertTrue($this->cache->flushIfDirty(), 'First flush after markDirty should regenerate.');
    // Flag is consumed: a second flush is a no-op.
    $this->assertFalse($this->cache->flushIfDirty(), 'Second flush without a new mark should be a no-op.');
  }

  /**
   * Multiple markDirty() calls still collapse to a single flush.
   *
   * @covers ::markDirty
   * @covers ::flushIfDirty
   */
  public function testMultipleMarksCollapseToOneFlush(): void {
    $this->cache->markDirty();
    $this->cache->markDirty();
    $this->cache->markDirty();
    $this->assertTrue($this->cache->flushIfDirty(), 'Flush runs once for N marks.');
    $this->assertFalse($this->cache->flushIfDirty(), 'No second flush — N marks collapsed to one.');
  }

  /**
   * The terminate subscriber is registered and wired to the cache service.
   */
  public function testFlushSubscriberRegistered(): void {
    $this->assertTrue(
      $this->container->has('ood_software.appverse_cache_flush'),
      'The kernel.terminate flush subscriber should be registered.'
    );
  }

}
