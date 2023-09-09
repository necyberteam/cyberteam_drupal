<?php

namespace Drupal;

use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Behat\Tester\Exception\PendingException;
use Drupal\DrupalExtension\Context\RawDrupalContext;

/**
 * FeatureContext class defines custom step definitions for Behat.
 */
class FeatureContext extends RawDrupalContext {

  /**
   * Every scenario gets its own context instance.
   *
   * You can also pass arbitrary arguments to the
   * context constructor through behat.yml.
   */
  public function __construct() {
  }

  /**
   * Work-around https://github.com/jhedstrom/drupalextension/issues/486.
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
   * Log in as a particular email.
   *
   * @param string $email
   *   Email of user.
   *
   * @Given I am logged in with email :name
   */
  public function iAmLoggedInWithEmail($email) {

    // Pass base url to drush command.

    $uli = $this->getDriver('drush')->drush('uli', [
      "--mail=$email",
      "--browser=0",
      "--uri=$domain",
    ]);

    // Trim EOL characters.
    $uli = trim($uli);

    // Log in.
    $this->getSession()->visit($uli);
  }


  /**
   * Log in as a particular UID.
   *
   * @param string $uid
   *   Uid of user.
   *
   * @Given I am logged in with uid :uid
   */
  public function iAmLoggedInAsUid($uid) {

    $domain = $this->getMinkParameter('base_url');
    $uli = $this->getDriver('drush')->drush('uli', [
      "--uid=$uid",
      "--browser=0",
      "--uri=$domain",
    ]);

    // Trim EOL characters.
    $uli = trim($uli);

    // Log in.
    $this->getSession()->visit($uli);
  }

  /**
   * Look for submenus under a menu item.
   *
   * @param string $menu_text
   *   The text of the menue to verify.
   * @param string $links
   *   A comma-separated list of submenu items to verify.
   *
   * @Given menu :menu should have links :links
   */
  public function menuShouldHaveLink($menu_text, $links) {
    $page = $this->getSession()->getPage();

    // Look for 1 element with the menu name.
    $menu_element = $page->findAll('named', ['link', $menu_text]);
    $cnt = count($menu_element);
    if ($cnt === 0) {
      throw new \Exception("Did not find a link with text '$menu_text'");
    }

    if ($cnt > 1) {
      print("WARNING, Found $cnt links with text '$menu_text' - expected just 1, using first one.  This can be corrected by specifying the ID of this link in the feature file.");
    }

    // Ok, let's hover it.  (Turns out to be unnecessary.)
    // $menu_element[0]->mouseOver();

    // Need to get it's parent's parents to find submenus.
    $menu_element = $menu_element[0]->getParent()->getParent();

    $this->verifySubmenus($menu_element, $menu_text, $links);
  }

  /**
   * Look for links under an element identified by an ID.
   *
   * @param string $menu_text
   *   The text of the menu to verify.
   * @param string $link_id
   *   The ID of a DOM element.
   * @param string $links
   *   A comma-separated list of submenu items to verify.
   *
   * @Given menu :menu (with id=:link_id) should have links :links
   */
  public function iHoverOverTheElement($menu_text, $link_id, $links) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($link_id);

    if (!str_starts_with($elem->getText(), $menu_text)) {
      throw new \Exception(sprintf(
        'Link with specified id does not start with "%s", its text is "%s"',
        $menu_text,
        $elem->getText()
      ));
    }

    if (NULL === $elem) {
      throw new \Exception(sprintf('Could not find link for menu "%s" with id "%s"', $menu_text, $link_id));
    }

    // Ok, let's hover it.  (Turns out to be unnecessary.)
    // $element->mouseOver();

    $this->verifySubmenus($elem, $menu_text, $links);
  }

  /**
   * Display an element identified by an ID.
   *
   * @param string $element_id
   *   The text of the menue to verify.
   *
   * @Then I print element with id :element_id
   */
  public function iDisplayEnElement($element_id) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($element_id);

    print("element '$element_id': '" . ($elem ? $elem->getHtml() : "null") . "'\n");
  }

  /**
   * Display an element's value identified by an ID.
   *
   * @param string $element_id
   *   The text of the menue to verify.
   *
   * @Then I print value of element with id :element_id
   */
  public function iDisplayEnElementValue($element_id) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($element_id);

    print("element '$element_id' value: '" . ($elem ? $elem->getValue() : "null") . "'\n");
  }

  /**
   * Display info about all elements with an id.
   *
   * @param string $link
   *   The link to display.
   *
   * @Then I display element :element_id
   */
  public function iDisplayLink($link) {
    $session = $this->getSession();
    $elems = $session->getPage()->findAll('named', ['id', $link]);

    if (count($elems) == 0) {
      print("Did not find any elements with id '$link'\n");
    }

    foreach ($elems as $elem) {
      print("link '$link':'\n");
      print("  outHtml = '" . $elem->getOuterHtml() . "'\n");
      print("  html    = '" . $elem->getHtml() . "'\n");
      print("  text    = '" . $elem->getText() . "'\n");
      print("  value   = '" . $elem->getValue() . "'\n");
    }
  }

  /**
   * Verify the an element identified by an ID contains a string.
   *
   * @param string $element_id
   *   The text of the menu to verify.
   * @param string $contents
   *   Text that should appear in the field.
   *
   * @Then element :element_id should contain :contents
   */
  public function elementShouldContain($element_id, $contents) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($element_id);

    if (!$elem) {
      throw new \Exception("Could not find element with id '$element_id'");
    }

    $html = $elem->getHtml();

    if (!str_contains($html, $contents)) {
      throw new \Exception("Element with id '$element_id' does not contain '$contents', it contains '$html'");
    }
  }

  /**
   * Verify a link contains a url.
   *
   * @param string $link_text
   *   The text of the link to verify.
   * @param string $url
   *   URL that should appear in the field.
   *
   * @Then link :link_text should contain :url
   */
  public function linkShouldContainUrl($link_text, $url) {
    $session = $this->getSession();
    $elem = $session->getPage()->findLink($link_text);

    if (!$elem) {
      throw new \Exception("Could not find link with text '$link_text'");
    }

    $href = $elem->getAttribute('href');

    if (!str_contains($href, $url)) {
      throw new \Exception("Link '$link_text' does not contain '$url', it contains '$href'");
    }
  }

  /**
   * Verify the an element identified by an ID does not contains a string.
   *
   * @param string $element_id
   *   The text of the menue to verify.
   * @param string $contents
   *   Text that not should appear in the field.
   *
   * @Then element :element_id should not contain :contents
   */
  public function elementShouldNotContain($element_id, $contents) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($element_id);

    if (!$elem) {
      throw new \Exception("Could not find element with id '$element_id'");
    }

    if (str_contains($elem->getHtml(), $contents)) {
      throw new \Exception("Element with id '$element_id' errantly contain '$contents'");
    }
  }

  /**
   * Verify the value of an element identified by an ID contains a string.
   *
   * @param string $element_id
   *   The text of the menue to verify.
   * @param string $contents
   *   Text that should appear in the value of the element.
   *
   * @Then value of element :element_id should contain :contents
   */
  public function elementHasValue($element_id, $contents) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($element_id);

    if (!$elem) {
      throw new \Exception("Could not find element with id '$element_id'");
    }

    if (!str_contains($elem->getValue(), $contents)) {
      throw new \Exception("Element with id '$element_id' does not contain '$contents'");
    }
  }

  /**
   * Verify an element is disabled.
   *
   * @param string $element_id
   *   The text of the menue to verify.
   *
   * @Then :element_id is disabled
   */
  public function elementIsDisabled($element_id) {
    $session = $this->getSession();
    $elem = $session->getPage()->findById($element_id);

    if (!$elem) {
      throw new \Exception("Could not find element with id '$element_id'");
    }

    $contents = 'disabled="disabled"';

    if (!str_contains($elem->getOuterHtml(), $contents)) {
      throw new \Exception("Element with id '$element_id' does not contain '$contents'");
    }
  }

  /**
   * Verify the existence of submenus.
   *
   * @param unknown $menu_element
   *   The element to look for submenus under.
   * @param string $menu_text
   *   The text of the menue to verify.
   * @param string $links
   *   A comma-separated list of submenu items to verify.
   */
  private function verifySubmenus($menu_element, $menu_text, $links) {
    $submenus = explode(',', $links);
    foreach ($submenus as $submenu) {
      $submenu = trim($submenu);
      $el2 = $menu_element->findLink($submenu);
      if (NULL === $el2) {
        throw new \Exception("For menu '$menu_text', could not find submenu '$submenu'");
      }
    }
  }

  /**
   * Try waiting for readyState === complete.
   *
   * Not working as expected.
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
   * Look for a specific DOM element by selector.
   *
   * @Given I should see element with :arg1 selector
   */
  public function iShouldSeeElement($selector) {
    $page = $this->getSession()->getPage();
    $element = $page->find('css', $selector);

    if (empty($element)) {
      throw new \Exception("No html element found for the selector ('$selector')");
    }
  }

  /**
   * Click an element.
   *
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
   * Verify a button is disabled.
   *
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
   * Verify an image loads.
   *
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
        // Found the text --  return from this test.
        return;
      }
    }

    throw new \Exception("Did not find an image with alt text $alt_text");
  }

  /**
   * Verify an alt text image loads.
   *
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

        // Found the image -- return from this test.
        return;
      }
    }

    throw new \Exception("Did not find an image with src $src");
  }

  /**
   * Verify a URL loads an image.
   *
   * @When the image url :url should load
   */
  public function imageUrlShouldLoad($url) {
    $this->verifyImageLoads($url);
  }

  /**
   * Look for element(s) with the specified class selector.
   *
   * Check their img element(s) can load and have mime type image.
   *
   * For example: NECT has this:
   *      <img src="/themes/nect-theme/logo.png" class="logo" alt="Northeast Cyberteam">
   * and the following checks for it:
   *      Then all images with selector ".logo" should load
   * Another example, checking all images at a selector:
   *      And all images with selector ".view-affinity-group img" should load
   *
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
   *
   * Check their img element(s) can load and have mime type image and have alt text.
   *
   * For example: NECT has this:
   *      <img src="/themes/nect-theme/logo.png" class="logo" alt="Northeast Cyberteam">
   * and the following checks for it:
   *      Then all images with selector ".logo" should have alt text
   *
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
   * Verify a url points to a loadable image type resource.
   */
  private function verifyImageLoads($url) {
    if (substr($url, 0, 4) !== "http") {
      $session_url = $this->getSession()->getCurrentUrl();
      $parsed = parse_url($session_url);
      $url = $parsed['scheme'] . '://' . $parsed['host'] . $url;
    }

    // var_dump("verifying image $url");

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_exec($ch);

    // Get the content type.
    $mime_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    // var_dump($mime_type);
    if (strpos($mime_type, 'image/') === FALSE) {
      throw new \Exception(sprintf('The url %s did not return an image', $url));
    }
  }
}
