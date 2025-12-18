<?php

namespace Drupal\ood_software\Plugin\QueueWorker;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\ood_software\Plugin\GitHubService;

/**
 * Processes Appverse App nodes to update GitHub data.
 *
 * @QueueWorker(
 *   id = "appverse_app_updater",
 *   title = @Translation("Appverse App Updater"),
 *   cron = {"time" = 60}
 * )
 */
class AppverseAppUpdater extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  /**
   * The GitHub service.
   *
   * @var \Drupal\ood_software\Plugin\GitHubService
   */
  protected $githubService;

  /**
   * Constructs a new AppverseAppUpdater object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\ood_software\Plugin\GitHubService $github_service
   *   The GitHub service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, GitHubService $github_service) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->githubService = $github_service;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('ood_software.gh')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    $nid = $data['nid'];
    $node = Node::load($nid);

    if (!$node) {
      return;
    }

    $github_url = $node->get('field_appverse_github_url')->uri;

    $validUrl = $this->githubService->parseUrl($github_url);
    if ($validUrl) {
      $github_data = $this->githubService->getData();
      $lastupdated = $node->get('field_appverse_lastupdated')->value;

      if ($lastupdated != $this->githubService->getLastComittedDate()) {
        // Update fields.
        $node->set('body', [['format' => 'markdown', 'value' => $this->githubService->getDescription()]]);
        $node->set('field_appverse_readme', [['format' => 'markdown', 'value' => $this->githubService->getReadme()]]);
        $node->set('field_appverse_lastupdated', [['value' => $this->githubService->getLastComittedDate()]]);
        $node->save();
      }
    }
  }

}
