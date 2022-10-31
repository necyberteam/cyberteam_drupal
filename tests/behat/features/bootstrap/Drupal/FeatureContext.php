<?php

namespace Drupal;

use Behat\Behat\Tester\Exception\PendingException;
use Drupal\DrupalExtension\Context\RawDrupalContext;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;

/**
 * FeatureContext class defines custom step definitions for Behat.
 */
class FeatureContext extends RawDrupalContext
{

/**
   * Work around https://github.com/jhedstrom/drupalextension/issues/486
   *
   * @BeforeScenario
   */
  public function beforeJavascriptScenario(BeforeScenarioScope $scope) {
    $mink_context = $scope->getEnvironment()->getContext('Drupal\DrupalExtension\Context\MinkContext');
    if (!$mink_context) {
      return;
    }
    $mink_context->setMinkParameter('ajax_timeout', 15);
  }

    /**
     * Every scenario gets its own context instance.
     *
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct()
    {

    }

    /**
     * Waits a while, for debugging.
     *
     * @param int $seconds
     *   How long to wait.
     *
     * @When I wait :seconds second(s)
     */
    public function wait($seconds)
    {
        sleep($seconds);
    }

    /**
     * @Given I click the :arg1 element
     */
    public function iClickTheElement($selector)
    {
        $page = $this->getSession()->getPage();
        $element = $page->find('css', $selector);

        if (empty($element)) {
            throw new Exception("No html element found for the selector ('$selector')");
        }

        $element->click();
    }

    /**
     * @When I should see the :selector button is disabled 
     */
    public function iShouldSeetheButtonIsDisabled($selector)
    {
        $page = $this->getSession()->getPage();
        $element = $page->find('css', $selector);
        if (empty($element)) {
            throw new PendingException("No html element found for the selector ('$selector')");
        }
        if (!$element->hasClass('disabled')) {
            throw new PendingException("Element '$selector' is not disabled");
        }
    }
}
