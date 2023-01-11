@wip--
@api
@javascript

Feature: test

  Scenario: test
    When I am on the homepage
    Then all images should have alt text
    Then the image at ".logo" should load

    When I am on "/pegasus"
    Then all images should have alt text
    Then the image at ".logo" should load
    Then I should see an image with alt text "Northeast Cyberteam"
    Then I should see an image with alt text "Pegasus logo"
    Then the image url "/sites/default/files/inline-images/pegasus.png" should load

    # check failure
    Then I should see an image with alt text "xxxx"
