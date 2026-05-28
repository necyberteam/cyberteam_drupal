<?php

namespace Drupal\ood_software\Form;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Url;
use Drupal\node\NodeInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Confirm form for deleting an appverse_collection node + cascade.
 *
 * Lists the member Apps that will be cascade-deleted alongside the
 * Collection. On submit, deletes member Apps first, then the Collection.
 * The two deletes are wrapped in a DB transaction so a failure mid-way
 * rolls back to a clean state. Redirects back to the user's hub.
 *
 * Access: owner-or-admin via the route's _custom_access callback
 * (AppverseHubController::ownerOrAdminAccess).
 */
final class AppverseHubDeleteForm extends ConfirmFormBase {

  protected NodeInterface $collection;

  protected LoggerInterface $logger;

  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
    protected Connection $database,
    LoggerChannelFactoryInterface $loggerFactory,
  ) {
    $this->logger = $loggerFactory->get('ood_software');
  }

  public static function create(ContainerInterface $container): self {
    return new self(
      $container->get('entity_type.manager'),
      $container->get('database'),
      $container->get('logger.factory'),
    );
  }

  public function getFormId(): string {
    return 'appverse_hub_delete_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state, ?NodeInterface $node = NULL): array {
    if (!$node || $node->bundle() !== 'appverse_repo') {
      throw new \InvalidArgumentException('Expected an appverse_collection node.');
    }
    $this->collection = $node;

    $form = parent::buildForm($form, $form_state);

    // List the member apps that will cascade.
    $memberAppIds = $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->condition('field_appverse_repo', $node->id())
      ->execute();
    if (!empty($memberAppIds)) {
      $items = [];
      foreach ($this->entityTypeManager->getStorage('node')->loadMultiple($memberAppIds) as $app) {
        $items[] = $app->label();
      }
      // #theme item_list escapes each entry via the render system,
      // so we don't manually call htmlspecialchars.
      $form['cascade'] = [
        '#theme' => 'item_list',
        '#title' => $this->t('The following @count apps will also be deleted:', ['@count' => count($items)]),
        '#items' => $items,
      ];
    }

    return $form;
  }

  public function getQuestion(): \Drupal\Core\StringTranslation\TranslatableMarkup {
    return $this->t('Delete @title and all its apps?', ['@title' => $this->collection->label()]);
  }

  public function getCancelUrl(): Url {
    return Url::fromUri('internal:/user/' . $this->currentUser()->id() . '/my-appverse');
  }

  public function getConfirmText(): \Drupal\Core\StringTranslation\TranslatableMarkup {
    return $this->t('Delete');
  }

  public function getDescription(): \Drupal\Core\StringTranslation\TranslatableMarkup {
    return $this->t('This cannot be undone. The Collection and all its apps will be removed from the catalog. You can re-submit the Collection later if you change your mind.');
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $title = $this->collection->label();

    // Wrap the cascade in a DB transaction so a failure mid-way rolls
    // back to a clean state (no orphaned apps with a missing parent
    // Collection, and no Collection sticking around without its apps).
    $transaction = $this->database->startTransaction();
    try {
      $memberAppIds = $this->entityTypeManager->getStorage('node')->getQuery()
        ->accessCheck(FALSE)
        ->condition('type', 'appverse_app')
        ->condition('field_appverse_repo', $this->collection->id())
        ->execute();

      if (!empty($memberAppIds)) {
        $apps = $this->entityTypeManager->getStorage('node')->loadMultiple($memberAppIds);
        $this->entityTypeManager->getStorage('node')->delete($apps);
      }

      $this->collection->delete();
    }
    catch (\Throwable $e) {
      $transaction->rollBack();
      $this->logger->error(
        'Cascade delete of Collection @nid failed: @msg',
        ['@nid' => $this->collection->id(), '@msg' => $e->getMessage()]
      );
      $this->messenger()->addError($this->t('Could not delete @title — the operation has been rolled back. @msg', [
        '@title' => $title,
        '@msg' => $e->getMessage(),
      ]));
      $form_state->setRedirectUrl(Url::fromUri(
        'internal:/user/' . $this->currentUser()->id() . '/my-appverse'
      ));
      return;
    }

    $this->messenger()->addStatus($this->t('Deleted @title and all its apps.', ['@title' => $title]));

    // Use a literal URI instead of a route name — the Views page route
    // for `/user/%user/my-appverse` is auto-generated by Views, and
    // its name can drift; a literal URI is more robust.
    $form_state->setRedirectUrl(Url::fromUri(
      'internal:/user/' . $this->currentUser()->id() . '/my-appverse'
    ));
  }

}
