<?php

namespace Drupal\ood_software\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use GuzzleHttp\ClientInterface;

/**
 * Syncs markdown documentation from GitHub to Drupal nodes.
 */
class DocSyncService {

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The logger.
   *
   * @var \Psr\Log\LoggerInterface
   */
  protected $logger;

  /**
   * Map of GitHub doc filenames to Drupal node IDs.
   */
  public const DOC_MAP = [
    'appverse-contributor-guide.md' => 11929,
    'app-best-practices.md' => 11933,
    'app-review-checklist.md' => 11932,
  ];

  /**
   * GitHub raw content base URL.
   */
  protected const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/sweet-and-fizzy/ood-appverse/main/docs/';

  /**
   * Constructs a DocSyncService object.
   */
  public function __construct(ClientInterface $http_client, EntityTypeManagerInterface $entity_type_manager, LoggerChannelFactoryInterface $logger_factory) {
    $this->httpClient = $http_client;
    $this->entityTypeManager = $entity_type_manager;
    $this->logger = $logger_factory->get('ood_software');
  }

  /**
   * Sync all mapped docs from GitHub to Drupal nodes.
   */
  public function syncAll() {
    foreach (self::DOC_MAP as $filename => $nid) {
      $this->syncDoc($filename, $nid);
    }
  }

  /**
   * Sync a single doc from GitHub to a Drupal node.
   *
   * @param string $filename
   *   The markdown filename in the docs directory.
   * @param int $nid
   *   The Drupal node ID to update.
   */
  protected function syncDoc($filename, $nid) {
    $url = self::GITHUB_RAW_BASE . $filename;

    try {
      $response = $this->httpClient->request('GET', $url, [
        'timeout' => 15,
      ]);
      $markdown = $response->getBody()->getContents();
    }
    catch (\Exception $e) {
      $this->logger->error('Failed to fetch @file from GitHub: @error', [
        '@file' => $filename,
        '@error' => $e->getMessage(),
      ]);
      return;
    }

    if (empty($markdown)) {
      $this->logger->warning('Empty content fetched for @file, skipping.', [
        '@file' => $filename,
      ]);
      return;
    }

    $node = $this->entityTypeManager->getStorage('node')->load($nid);
    if (!$node) {
      $this->logger->error('Node @nid not found for @file.', [
        '@nid' => $nid,
        '@file' => $filename,
      ]);
      return;
    }

    // Strip the first H1 heading since the page title handles that.
    $markdown = preg_replace('/\A#\s+.+\n*/', '', $markdown, 1);

    $current_body = $node->get('body')->value;
    $current_format = $node->get('body')->format;

    // Only save if content actually changed.
    if ($current_body === $markdown && $current_format === 'markdown') {
      return;
    }

    $node->set('body', [
      'value' => $markdown,
      'format' => 'markdown',
    ]);
    $node->save();

    $this->logger->notice('Synced @file to node @nid.', [
      '@file' => $filename,
      '@nid' => $nid,
    ]);
  }

}
