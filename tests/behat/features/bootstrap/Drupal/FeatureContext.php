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
    public function beforeJavascriptScenario(BeforeScenarioScope $scope)
    {
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
     * @When I wait for the page to be loaded
     */
    public function waitForThePageToBeLoaded()
    {
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
    public function wait($seconds)
    {
        sleep($seconds);
    }

    /**
     * @Given I should see element with :arg1 selector
     */
    public function IShouldSeeElement($selector)
    {
        $page = $this->getSession()->getPage();
        $element = $page->find('css', $selector);

        if (empty($element)) {
            throw new \Exception("No html element found for the selector ('$selector')");
        }

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

    /**
     * Not sure this is useful, but leaving here for now.
     * Verifies that all images on a page have the 'alt' attribute.
     * But how should this be used?  Would be nice if run by default for every page.
     *
     * @When all images should have alt text
     */
    public function allImagesShouldHaveAltText()
    {
        $imageElements = $this->getSession()->getPage()->findAll('css', 'img');
        foreach ($imageElements as $image) {

            $src = $image->getAttribute('src');
            // we could enable this too, but on dev vms,
            // many images are not loaded and this may be too strict
            // $this->verifyImageLoads($src);

            $alt = $image->getAttribute('alt');
            if (!$alt) {
                throw new \Exception('No alt text for image with src=$src on page '
                    . $this->getSession()->getCurrentUrl());
            }
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
    public function verifyImageWithAltTxt($alt_text)
    {
        $page = $this->getSession()->getPage();
        $img = $page->findLink($alt_text);
        $src = $img->find('css', 'img');
        $this->verifyImage($src);
    }

    /**
     * Look for an element with the specified class selector.
     * Check it has a single img element and that the resource can load and has
     * mime type image
     *
     * @When The image at :selector should load
     */
    public function confirmImageLoads($selector)
    {
        $page = $this->getSession()->getPage();
        $all = $page->findAll('css', $selector);
        $selCnt = count($all);
        if ($selCnt != 1) {
            throw new \Exception("Found $selCnt selectors named '$selector', but expected just one");
        }

        $images = $all[0]->findAll('css', 'img');
        $imgCnt = count($images);
        if ($imgCnt != 1) {
            throw new \Exception("Found $imgCnt images, but expected just one");
        }

        $this->verifyImage($images[0]);
    }

    /**
     * Given an img element, verify the src links to a loadable image type resource
     */
    public function verifyImage($img)
    {
        $url = $img->getAttribute('src');

        // var_dump("url = $url");

        if (substr($url, 0, 4) !== "http") {
            $session_url = $this->getSession()->getCurrentUrl();
            $url = rtrim($session_url, '/') . $url;
        }

        $ch  = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);

        // get the content type
        $mime_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        if (strpos($mime_type, 'image/') === FALSE) {
            throw new \Exception(sprintf('%s did not return an image', $url));
        }
    }
}
