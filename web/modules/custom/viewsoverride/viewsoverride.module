<?php

use Drupal\views\ViewExecutable;
use Drupal\views\Plugin\views\query\QueryPluginBase;

function VIEWSOVERRIDE_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {
  // make sure we're altering the correct view
  if ($view->storage->get('id') === 'projects' && $view->current_display === 'block_1') {
    // foreach top level condition group
    foreach ($query->where as &$condition_group) {
      // call helper function to recursively alter conditions
      _recursively_alter_query_conditions($condition_group['conditions']);
    }
  }
  if ($view->storage->get('id') === 'projects' && $view->current_display === 'block_4') {
    // foreach top level condition group
    foreach ($query->where as &$condition_group) {
      // call helper function to recursively alter conditions
      _recursively_alter_query_conditions($condition_group['conditions']);
    }
  }
  if ($view->storage->get('id') === 'resources' && $view->current_display === 'block_1') {
    // foreach top level condition group
    foreach ($query->where as &$condition_group) {
      // call helper function to recursively alter conditions
      _recursively_alter_query_conditions($condition_group['conditions']);
    }
  }
}

// helper function: (takes in conditions group argument)
function _recursively_alter_query_conditions(&$conditions) {
  // foreach condition in condition group
  foreach ($conditions as &$condition) {
    // if condition is itself a condition group
    if (isset($condition['field']) && is_a($condition['field'], 'Drupal\Core\Database\Query\Condition')) {
      // call the helper function on it
      _recursively_alter_query_conditions($condition['field']->conditions());
    }
    else {
      // check if we want to alter the condition and if so alter it
      _alter_query_condition($condition);
    }
  }
}

// separate helper function to determine if the condition is one we want to alter
function _alter_query_condition(&$condition) {
  if (isset($condition['field']) && ($condition['field'] === 'webform_submission_field_project_terms.value')) {
    $condition['value'] = "%%({$condition['value']})%%";
    $condition['operator'] = 'LIKE';
  }
  if (isset($condition['field']) && ($condition['field'] === 'webform_submission_field_resource_terms.value')) {
    $condition['value'] = "%%({$condition['value']})%%";
    $condition['operator'] = 'LIKE';
  }
}
