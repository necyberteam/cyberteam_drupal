@wip-
@api
@javascript

Feature: test

  Scenario: test
    # When I am on the homepage
    # Then the image with selector ".logo" should load

    When I am on "/pegasus"
    Then the image with selector ".logo" should load
    Then the image with selector ".logo" has alt text

    #Then the image with selector "#section1 img" has alt text


    Then I should see an image with alt text "Northeast Cyberteam"
    Then I should see an image with src "/sites/default/files/inline-images/pegasus.png"
    Then I should see an image with alt text "Pegasus logo"
    Then the image url "/sites/default/files/inline-images/pegasus.png" should load

    # check failure
    # Then I should see an image with alt text "xxxx"
    # Then the image url "xxxx" should load
