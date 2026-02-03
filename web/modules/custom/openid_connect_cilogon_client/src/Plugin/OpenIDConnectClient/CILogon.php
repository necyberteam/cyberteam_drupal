<?php

namespace Drupal\openid_connect_cilogon_client\Plugin\OpenIDConnectClient;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\GeneratedUrl;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Drupal\Core\Url;
use Drupal\openid_connect\Plugin\OpenIDConnectClientBase;

/**
 * CILogon OpenID Connect client.
 *
 * @OpenIDConnectClient(
 *   id = "cilogon",
 *   label = @Translation("Login with your institution")
 * )
 */
class CILogon extends OpenIDConnectClientBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'authorization_endpoint' => 'https://cilogon.org/authorize',
      'token_endpoint' => 'https://cilogon.org/oauth2/token',
      'userinfo_endpoint' => 'https://cilogon.org/oauth2/userinfo',
      'idp_hint' => '',
      'store_idp_name' => TRUE,
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);

    $form['authorization_endpoint'] = [
      '#title' => $this->t('Authorization endpoint'),
      '#type' => 'textfield',
      '#default_value' => $this->configuration['authorization_endpoint'],
      '#description' => $this->t('The authorization endpoint URL. Default: https://cilogon.org/authorize'),
    ];

    $form['token_endpoint'] = [
      '#title' => $this->t('Token endpoint'),
      '#type' => 'textfield',
      '#default_value' => $this->configuration['token_endpoint'],
      '#description' => $this->t('The token exchange endpoint URL. Default: https://cilogon.org/oauth2/token'),
    ];

    $form['userinfo_endpoint'] = [
      '#title' => $this->t('UserInfo endpoint'),
      '#type' => 'textfield',
      '#default_value' => $this->configuration['userinfo_endpoint'],
      '#description' => $this->t('The user information endpoint URL. Default: https://cilogon.org/oauth2/userinfo'),
    ];

    $form['idp_hint'] = [
      '#title' => $this->t('IdP hint'),
      '#type' => 'textfield',
      '#default_value' => $this->configuration['idp_hint'],
      '#description' => $this->t('Optional Identity Provider hint parameter (e.g., https://access-ci.org/idp). Leave empty to show institution selector.'),
    ];

    $form['store_idp_name'] = [
      '#title' => $this->t('Store identity provider name'),
      '#type' => 'checkbox',
      '#default_value' => $this->configuration['store_idp_name'],
      '#description' => $this->t('Store the identity provider name in the user field.'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function getEndpoints() {
    return [
      'authorization' => $this->configuration['authorization_endpoint'],
      'token' => $this->configuration['token_endpoint'],
      'userinfo' => $this->configuration['userinfo_endpoint'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getClientScopes() {
    // CILogon requires these specific scopes
    return ['openid', 'email', 'profile', 'org.cilogon.userinfo'];
  }

  /**
   * {@inheritdoc}
   */
  public function authorize($scope = 'openid email') {
    $redirect_uri = $this->getRedirectUrl()->toString(TRUE);
    $url_options = $this->getUrlOptions($scope, $redirect_uri);

    // Add idphint parameter if configured
    if (!empty($this->configuration['idp_hint'])) {
      $url_options['query']['idphint'] = $this->configuration['idp_hint'];
    }

    $endpoints = $this->getEndpoints();
    // Clear _GET['destination'] because we need to override it.
    $this->requestStack->getCurrentRequest()->query->remove('destination');
    $authorization_endpoint = Url::fromUri($endpoints['authorization'], $url_options)->toString(TRUE);

    $response = new TrustedRedirectResponse($authorization_endpoint->getGeneratedUrl());
    // We can't cache the response, since this will prevent the state to be
    // added to the session. The kill switch will prevent the page getting
    // cached for anonymous users when page cache is active.
    $this->pageCacheKillSwitch->trigger();

    return $response;
  }

}
