<?php

use Drupal\views\ViewExecutable;
use Drupal\views\Plugin\views\query\QueryPluginBase;

/**
 * Implements hook_views_query_alter().
 * 
 * Filter Campus Champions on approved field in the campus_champions table.
 */

function campuschampions_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {
  if (($view->id() == 'people_card_view' && $view->getDisplay()->display['id'] == 'card_campus_champions') || ($view->id() == 'people_list_view' && $view->getDisplay()->display['id'] == 'list_campus_champions')) {  
      $definition = [
        'table' => 'campus_champions',
        'field' => 'uid',
        'left_table' => 'users',
        'left_field' => 'uid',
      ];
      $join = \Drupal\views\Views::pluginManager('join')->createInstance('standard', $definition);
      $rel = $query->addRelationship('campus_champions', $join, 'users');
      $query->addTable('campus_champions', $rel, $join, 'campus_champions');
      $query->addWhere('', 'campus_champions.approved', 1, '=');
  }
}
?>