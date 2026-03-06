<?php

namespace Drupal\ood_software\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Adds cache headers to JSON:API responses.
 *
 * Pantheon's Global CDN (Varnish) respects Surrogate-Control for edge caching
 * and Cache-Control for browser caching. By default, JSON:API responses have
 * no max-age, so the CDN treats them as uncacheable.
 *
 * Cache invalidation is handled by Drupal's cache tag system — when an
 * entity is saved, Pantheon's Advanced Page Cache module purges the CDN
 * entries tagged with that entity.
 */
class JsonApiCacheSubscriber implements EventSubscriberInterface {

  /**
   * CDN edge cache TTL in seconds (1 hour).
   */
  const EDGE_MAX_AGE = 3600;

  /**
   * Browser cache TTL in seconds (5 minutes).
   *
   * Keep this short so users see updates relatively quickly without
   * hard-refreshing, while the CDN handles the heavy lifting.
   */
  const BROWSER_MAX_AGE = 300;

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::RESPONSE => ['onResponse', -10],
    ];
  }

  /**
   * Adds cache headers to JSON:API responses.
   */
  public function onResponse(ResponseEvent $event): void {
    if (!$event->isMainRequest()) {
      return;
    }

    $request = $event->getRequest();
    $path = $request->getPathInfo();

    // Only target JSON:API endpoints.
    if (!str_starts_with($path, '/jsonapi/')) {
      return;
    }

    $response = $event->getResponse();

    // Don't cache error responses.
    if ($response->getStatusCode() >= 400) {
      return;
    }

    // Don't cache authenticated/personalized responses.
    if ($request->getSession()?->isStarted()) {
      return;
    }

    // Set Surrogate-Control for Pantheon CDN edge caching.
    $response->headers->set('Surrogate-Control', 'max-age=' . self::EDGE_MAX_AGE);

    // Set Cache-Control for browser caching.
    $response->headers->set('Cache-Control', 'public, max-age=' . self::BROWSER_MAX_AGE);
  }

}
