<?php

namespace Drupal;

use Behat\Behat\Tester\Exception\PendingException;
use Drupal\DrupalExtension\Context\RawDrupalContext;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;

/**
 * FeatureContext class defines custom step definitions for Behat.
 */
class FeatureContext extends RawDrupalContext {

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
  public function __construct() {
  }

  /**
   * @Given I am logged in as user :name
   */
  public function iAmLoggedInAsUser($name) {
    $domain = $this->getMinkParameter('base_url');

    // Pass base url to drush command.
    $uli = $this->getDriver('drush')->drush('uli', [
      "--name '" . $name . "'",
      "--browser=0",
      "--uri=$domain",
    ]);

    // Trim EOL characters.
    $uli = trim($uli);

    // Log in.
    $this->getSession()->visit($uli);
  }

  /**
   * Attempt to write a function that waits for the page to load.
   *
   * Note, have seen this not always work.  Perhaps the 10 second timeout is
   * insufficient.
   *
   * @When I wait for the page to be loaded
   */
  public function waitForThePageToBeLoaded() {
    $this->getSession()->wait(10000, "document.readyState === 'complete'");
  }


  /**
   * Waits a while, for debugging.
   *
   * @param int $seconds
   *   How long to wait.
   *
   * @When I wait :seconds second(s)
   */
  public function wait($seconds) {
    sleep($seconds);
  }

  /**
   * @Given I should see element with :arg1 selector
   */
  public function IShouldSeeElement($selector) {
    $page = $this->getSession()->getPage();
    $element = $page->find('css', $selector);

    if (empty($element)) {
      throw new \Exception("No html element found for the selector ('$selector')");
    }
  }
  /**
   * @Given I click the :arg1 element
   */
  public function iClickTheElement($selector) {
    $page = $this->getSession()->getPage();
    $element = $page->find('css', $selector);

    if (empty($element)) {
      throw new \Exception("No html element found for the selector ('$selector')");
    }

    $element->click();
  }

  /**
   * @When I should see the :selector button is disabled
   */
  public function iShouldSeetheButtonIsDisabled($selector) {
    $page = $this->getSession()->getPage();
    $element = $page->find('css', $selector);
    if (empty($element)) {
      throw new PendingException("No html element found for the selector ('$selector')");
    }
    if (!$element->hasClass('disabled')) {
      throw new PendingException("Element '$selector' is not disabled");
    }
  }


  /**
   * Verifies the page contains an image with the specified alt attribute,
   * and that the image loads.
   *
   * Example:
   *      Then I should see an image with alt text "Pegasus logo"
   * works on /pegasus, which contain this <img> :
   *      <img alt="Pegasus logo" data-entity-type="" data-entity-uuid=""
   *          src="/sites/default/files/inline-images/pegasus.png" width="204">
   *
   * @When I should see an image with alt text :alt_text
   */
  public function iShouldSeeAnImageWithAltText($alt_text) {
    $imageElements = $this->getSession()->getPage()->findAll('css', 'img');
    foreach ($imageElements as $image) {

      $alt = $image->getAttribute('alt');

      if ($alt === $alt_text) {
        $src = $image->getAttribute('src');
        $this->verifyImageLoads($src);
        // found the text --  return from this test
        return;
      }
    }

    // didn't find the alt text
    throw new \Exception("Did not find an image with alt text $alt_text");
  }

  /**
   * Verifies the page contains an image with the specified src attribute,
   * and that the image loads and has some text for its alt attribute.
   *
   * Example:
   *    Then I should see an image with src "/sites/default/files/inline-images/pegasus.png"
   * works on /pegasus, which contain this <img> :
   *    <img alt="Pegasus logo" data-entity-type="" data-entity-uuid=""
   *          src="/sites/default/files/inline-images/pegasus.png" width="204">
   *
   * @When I should see an image with src :src
   */
  public function iShouldSeeAnImageWithSrc($src) {
    $imageElements = $this->getSession()->getPage()->findAll('css', 'img');
    foreach ($imageElements as $image) {

      $src_attr = $image->getAttribute('src');

      if ($src_attr === $src) {
        $this->verifyImageLoads($src);
        if (!$image->getAttribute('alt')) {
          throw new \Exception("Image at '$src' has no alt attribute.");
        }

        // found the image -- return from this test
        return;
      }
    }

    // didn't find the alt text
    throw new \Exception("Did not find an image with src $src");
  }

  /**
   * Verify a URL loads an image
   *
   * @When the image url :url should load
   */
  public function imageUrlShouldLoad($url) {
    $this->verifyImageLoads($url);
  }


  /**
   * Look for element(s) with the specified class selector.
   * Check their img element(s) can load and have mime type image.
   *
   * For example: NECT has this:
   *      <img src="/themes/nect-theme/logo.png" class="logo" alt="Northeast Cyberteam">
   * and the following checks for it:
   *      Then all images with selector ".logo" should load
   * Another example, checking all images at a selector:
   *      And all images with selector ".view-affinity-group img" should load

   * @When all images with selector :selector should load
   */
  public function imageAtSelectorShouldLoad($selector) {
    $page = $this->getSession()->getPage();

    $all = $page->findAll('css', $selector);
    if (count($all) == 0) {
      throw new \Exception("Found no elements with selector '$selector'");
    }

    foreach ($all as $elem_key => $ele_value) {

      $images = $ele_value->findAll('css', 'img');
      if (count($images) == 0) {
        throw new \Exception("Found no images for element #$elem_key with selector '$selector'");
      }

      foreach ($images as $image_key => $image_value) {

        $url = $image_value->getAttribute('src');

        $this->verifyImageLoads($url);
      }
    }
  }

  /**

   * Look for element(s) with the specified class selector.
   * Check their img element(s) can load and have mime type image and have alt text.
   *
   * For example: NECT has this:
   *      <img src="/themes/nect-theme/logo.png" class="logo" alt="Northeast Cyberteam">
   * and the following checks for it:
   *      Then all images with selector ".logo" should have alt text

   * @When all images with selector :selector should have alt text
   */
  public function imageAtSelectorHasAltText($selector) {
    $page = $this->getSession()->getPage();

    $all = $page->findAll('css', $selector);
    if (count($all) == 0) {
      throw new \Exception("Found no elements with selector '$selector'");
    }

    foreach ($all as $elem_key => $ele_value) {

      $images = $ele_value->findAll('css', 'img');
      if (count($images) == 0) {
        throw new \Exception("Found no images for element #$elem_key with selector '$selector'");
      }

      foreach ($images as $image_key => $image_value) {

        $url = $image_value->getAttribute('src');

        $this->verifyImageLoads($url);

        if (!$image_value->getAttribute('alt')) {
          throw new \Exception("Image #$image_key for element #$elem_key with selector '$selector' has no alt text.");
        }
      }
    }
  }

  /**
   * Verify a url points to a loadable image type resource
   */
  private function verifyImageLoads($url) {
    if (substr($url, 0, 4) !== "http") {
      $session_url = $this->getSession()->getCurrentUrl();
      $parsed = parse_url($session_url);
      $url = $parsed['scheme'] . '://' . $parsed['host'] . $url;
    }
    // var_dump("verifying image $url");

    $ch  = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);

    // get the content type
    $mime_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    // var_dump($mime_type);
    if (strpos($mime_type, 'image/') === false) {
      throw new \Exception(sprintf('The url %s did not return an image', $url));
    }
  }
}
