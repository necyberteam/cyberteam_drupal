<?php

namespace Drupal\ood_software\EventSubscriber;

use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Adds cache and compression headers to JSON:API responses.
 *
 * Pantheon's Global CDN (Fastly/Varnish) respects Surrogate-Control for edge
 * caching and Cache-Control for browser caching. By default, JSON:API responses
 * have no max-age, so the CDN treats them as uncacheable.
 *
 * For anonymous users, we set CDN edge caching headers and remove Vary: Cookie
 * so the CDN shares a single cache entry. For authenticated users, we set
 * browser-only caching (private) so admins don't poison the CDN cache with
 * unpublished content.
 *
 * Fastly does not gzip application/vnd.api+json by default, so we compress
 * responses in PHP when the client supports it.
 *
 * Cache invalidation is handled by Drupal's cache tag system — when an
 * entity is saved, Pantheon's Advanced Page Cache module purges the CDN
 * entries tagged with that entity.
 */
class JsonApiCacheSubscriber implements EventSubscriberInterface {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected AccountProxyInterface $currentUser;

  /**
   * Constructs a JsonApiCacheSubscriber.
   */
  public function __construct(AccountProxyInterface $current_user) {
    $this->currentUser = $current_user;
  }

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
   * Adds cache headers and gzip compression to JSON:API responses.
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

    if ($this->currentUser->isAuthenticated()) {
      // Authenticated users get browser-only caching. Don't let the CDN cache
      // these responses since admins may see unpublished content.
      $response->headers->set('Cache-Control', 'private, max-age=' . self::BROWSER_MAX_AGE);
    }
    else {
      // Anonymous users get full CDN + browser caching.
      $response->headers->set('Surrogate-Control', 'max-age=' . self::EDGE_MAX_AGE);
      $response->headers->set('Cache-Control', 'public, max-age=' . self::BROWSER_MAX_AGE);
      // Remove Vary: Cookie so the CDN shares one cache entry for all
      // anonymous users regardless of any tracking cookies.
      $response->headers->set('Vary', 'Accept-Encoding');
    }

    // Gzip compress the response. Fastly does not gzip
    // application/vnd.api+json by default.
    $this->compressResponse($request, $response);
  }

  /**
   * Gzip compresses the response body if the client supports it.
   */
  protected function compressResponse($request, Response $response): void {
    if (!str_contains($request->headers->get('Accept-Encoding', ''), 'gzip')) {
      return;
    }

    $content = $response->getContent();
    if ($content === FALSE || strlen($content) < 1024) {
      return;
    }

    $compressed = gzencode($content, 6);
    if ($compressed === FALSE) {
      return;
    }

    $response->setContent($compressed);
    $response->headers->set('Content-Encoding', 'gzip');
    $response->headers->set('Content-Length', (string) strlen($compressed));
  }

}
