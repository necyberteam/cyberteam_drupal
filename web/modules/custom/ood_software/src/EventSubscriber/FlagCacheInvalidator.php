<?php

namespace Drupal\ood_software\EventSubscriber;

use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Invalidates entity cache when appverse_apps flag changes.
 */
class FlagCacheInvalidator implements EventSubscriberInterface {

  /**
   * The cache tags invalidator.
   *
   * @var \Drupal\Core\Cache\CacheTagsInvalidatorInterface
   */
  protected $cacheTagsInvalidator;

  /**
   * Constructs a FlagCacheInvalidator object.
   *
   * @param \Drupal\Core\Cache\CacheTagsInvalidatorInterface $cache_tags_invalidator
   *   The cache tags invalidator.
   */
  public function __construct(CacheTagsInvalidatorInterface $cache_tags_invalidator) {
    $this->cacheTagsInvalidator = $cache_tags_invalidator;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    // Use string event names to avoid class loading issues at compile time.
    return [
      'flag.entity_flagged' => ['onFlag', 0],
      'flag.entity_unflagged' => ['onUnflag', 0],
    ];
  }

  /**
   * Invalidates cache when an entity is flagged.
   *
   * @param object $event
   *   The flagging event.
   */
  public function onFlag($event) {
    $flagging = $event->getFlagging();
    if ($flagging->getFlagId() === 'appverse_apps') {
      $entity = $flagging->getFlaggable();
      $this->cacheTagsInvalidator->invalidateTags($entity->getCacheTagsToInvalidate());
    }
  }

  /**
   * Invalidates cache when an entity is unflagged.
   *
   * @param object $event
   *   The unflagging event.
   */
  public function onUnflag($event) {
    foreach ($event->getFlaggings() as $flagging) {
      if ($flagging->getFlagId() === 'appverse_apps') {
        $entity = $flagging->getFlaggable();
        $this->cacheTagsInvalidator->invalidateTags($entity->getCacheTagsToInvalidate());
      }
    }
  }

}
