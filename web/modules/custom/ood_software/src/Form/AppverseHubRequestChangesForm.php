<?php

namespace Drupal\ood_software\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\node\NodeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Admin form for the request_adjustment moderation transition.
 *
 * Drupal's content_moderation lets admins move a node from
 * ready_for_review to needs_adjustment (workflow transition
 * `request_adjustment`). This form captures a required comment
 * that the contributor sees on their hub card.
 *
 * Comment is stored as the node's revision log message — the standard
 * Drupal place for moderation-state change rationale.
 */
final class AppverseHubRequestChangesForm extends FormBase {

  protected NodeInterface $node;

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
  ) {}

  public static function create(ContainerInterface $container): self {
    return new self($container->get('entity_type.manager'));
  }

  public function getFormId(): string {
    return 'appverse_hub_request_changes_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state, ?NodeInterface $node = NULL): array {
    if (!$node) {
      throw new \InvalidArgumentException('Expected a node argument.');
    }
    $this->node = $node;

    $form['intro'] = [
      '#markup' => '<p>' . $this->t('Request changes on <strong>@title</strong>. Your comment will be visible to the contributor on their maintenance hub.', ['@title' => $node->label()]) . '</p>',
    ];

    $form['comment'] = [
      '#type' => 'textarea',
      '#title' => $this->t('What needs to change?'),
      '#description' => $this->t('Be specific. The contributor sees this on their hub card.'),
      '#required' => TRUE,
      '#rows' => 5,
    ];

    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Request changes'),
      '#button_type' => 'primary',
    ];
    $form['actions']['cancel'] = [
      '#type' => 'link',
      '#title' => $this->t('Cancel'),
      '#url' => Url::fromUri('internal:/appverse/manage-collections'),
      '#attributes' => ['class' => ['button']],
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $comment = $form_state->getValue('comment');

    // Snapshot pre-transition status so we know whether to cascade-unpublish
    // member apps. Dropping a published Collection to needs_adjustment hides
    // it from the catalog; member apps must follow.
    $wasPublished = (bool) $this->node->isPublished();

    // Set moderation state + revision log (where the comment lives).
    $this->node->set('moderation_state', 'needs_adjustment');
    $this->node->setRevisionLogMessage((string) $comment);
    $this->node->setNewRevision(TRUE);
    // Stash the comment as a runtime property so ood_software_node_update
    // can forward it to CollectionNotificationService as $extras['comment'].
    // Drupal's entity API ignores unknown properties on save, so nothing
    // is persisted; this only survives in memory long enough for
    // hook_node_update to read it.
    $this->node->_ood_software_review_comment = $comment;
    $this->node->save();

    if ($wasPublished) {
      $this->cascadeUnpublishMemberApps($this->node);
    }

    $this->messenger()->addStatus($this->t('Requested changes on @title. The contributor will see your comment.', ['@title' => $this->node->label()]));
    $form_state->setRedirectUrl(Url::fromUri('internal:/appverse/manage-collections'));
  }

  /**
   * Drop all currently-published member apps of $collection to draft.
   *
   * Mirrors AppverseHubController::cascadeUnpublishMemberApps. Inlined here
   * to keep this form independent of the controller; both should stay
   * structurally identical. If the rule grows beyond a simple loop, move
   * it to a shared service.
   */
  protected function cascadeUnpublishMemberApps(NodeInterface $collection): void {
    $storage = $this->entityTypeManager->getStorage('node');
    $memberAppIds = $storage->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_collection', $collection->id())
      ->condition('status', 1)
      ->execute();

    $count = 0;
    foreach ($storage->loadMultiple($memberAppIds) as $app) {
      if (!$app->hasField('moderation_state')) {
        continue;
      }
      $app->set('moderation_state', 'draft');
      $app->setNewRevision(TRUE);
      $app->setRevisionLogMessage('Auto-unpublished via parent Collection request-changes.');
      $app->save();
      $count++;
    }

    if ($count > 0) {
      $this->messenger()->addStatus($this->t(
        'Also unpublished @count member apps under @title.',
        ['@count' => $count, '@title' => $collection->label()]
      ));
    }
  }

}
