<?php

namespace Drupal\openid_connect_cilogon_client\Plugin\OpenIDConnectClient;

use Drupal\Core\Form\FormStateInterface;

/**
 * CILogon OpenID Connect client for ACCESS CI.
 *
 * Pre-configured to use the ACCESS CI identity provider and require
 * @access-ci.org sub identifiers.
 *
 * @OpenIDConnectClient(
 *   id = "cilogon_accessci",
 *   label = @Translation("Login with ACCESS CI")
 * )
 */
class CILogonAccessCI extends CILogon {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    $config = parent::defaultConfiguration();
    // Pre-configure with ACCESS CI IdP hint
    $config['idp_hint'] = 'https://access-ci.org/idp';
    $config['require_access_ci_identity'] = TRUE;
    return $config;
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);

    // Add the require_access_ci_identity checkbox
    $form['require_access_ci_identity'] = [
      '#title' => $this->t('Require ACCESS CI identity'),
      '#type' => 'checkbox',
      '#default_value' => $this->configuration['require_access_ci_identity'] ?? TRUE,
      '#description' => $this->t('Require users to have an @access-ci.org sub identifier. This is recommended for ACCESS Support domain.'),
    ];

    // Update description for idp_hint to indicate it's pre-configured
    $form['idp_hint']['#description'] = $this->t('Pre-configured for ACCESS CI: https://access-ci.org/idp. You can change this if needed.');

    return $form;
  }

}
