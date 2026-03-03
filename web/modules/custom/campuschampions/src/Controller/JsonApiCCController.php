<?php

namespace Drupal\campuschampions\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Utility\Xss;

final class JsonApiCCController extends ControllerBase {

  /**
   * The database connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected Connection $database;

  /**
   * Constructs a JsonApiCCController object.
   *
   * @param \Drupal\Core\Database\Connection $database
   *   The database connection.
   */
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('database')
    );
  }

  /**
   * Autocomplete Carnegie Code based on institution name.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request object.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response.
   */
  public function handleAutocomplete(Request $request): JsonResponse {
    $results = [];
    $input = $request->query->get('q');
    if (!$input) {
      return new JsonResponse($results);
    }
    $input = Xss::filter($input);

    $query = $this->database->select('carnegie_codes', 'cc');
    $query->condition('cc.instnm', '%' . $input . '%', 'LIKE');
    $query->fields('cc', ['unitid', 'instnm']);
    $query->range(0, 25);

    $rows = $query->execute();
    foreach ($rows as $row) {
      $results[] = [
        'label' => $row->instnm,
        'value' => $row->unitid,
      ];
    }
    return new JsonResponse($results);
  }

}
