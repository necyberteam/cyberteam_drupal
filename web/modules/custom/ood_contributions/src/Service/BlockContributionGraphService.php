<?php

namespace Drupal\ood_contributions\Service;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;

/**
 * Service for populating a block with all user contribution graphs.
 */
class BlockContributionGraphService {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The contribution graph service.
   *
   * @var \Drupal\ood_contributions\Service\ContributionGraphService
   */
  protected $contributionGraph;

  /**
   * The logger channel.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * Constructs a BlockContributionGraphService object.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\ood_contributions\Service\ContributionGraphService $contribution_graph
   *   The contribution graph service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(Connection $database, EntityTypeManagerInterface $entity_type_manager, ContributionGraphService $contribution_graph, LoggerChannelFactoryInterface $logger_factory) {
    $this->database = $database;
    $this->entityTypeManager = $entity_type_manager;
    $this->contributionGraph = $contribution_graph;
    $this->logger = $logger_factory->get('ood_contributions');
  }

  /**
   * Updates the block with aggregated contribution graph for all users.
   *
   * @param int $bid
   *   The block content ID (default: 208).
   * @param int $weeks
   *   Number of weeks to display (default: 52).
   *
   * @return bool
   *   TRUE if successful, FALSE otherwise.
   */
  public function updateBlock(int $bid = 208, int $weeks = 52): bool {
    try {
      // Load the block content entity.
      $block_storage = $this->entityTypeManager->getStorage('block_content');
      $block = $block_storage->load($bid);

      if (!$block) {
        $this->logger->error('Block content with ID @bid not found.', ['@bid' => $bid]);
        return FALSE;
      }

      // Generate a single aggregated graph for all users.
      $html = '<div class="all-contribution-graphs">';
      $html .= $this->contributionGraph->generateGraph(NULL, $weeks);
      $html .= '</div>';

      // Update the block body field.
      if ($block->hasField('body')) {
        $block->body->value = $html;
        $block->body->format = 'full_no_editor';
        $block->save();
        
        $this->logger->info('Successfully updated block @bid with aggregated contribution graph.', [
          '@bid' => $bid,
        ]);
        
        return TRUE;
      }
      else {
        $this->logger->error('Block @bid does not have a body field.', ['@bid' => $bid]);
        return FALSE;
      }
    }
    catch (\Exception $e) {
      $this->logger->error('Error updating block with contribution graphs: @message', [
        '@message' => $e->getMessage(),
      ]);
      return FALSE;
    }
  }

}
