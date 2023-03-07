@asp
@api
@javascript

Feature: test ACCESS Support Science Gateways Page

  Scenario: Unauthenticated user tests the Science Gateways Page
    Given I am not logged in
    When I go to "/tools/science-gateways"
    Then I should see "Science Gateways"
    Then I should see "Providing Infrastructure and Resources to the Community"
    Then I should see "Through streamlined,"

    # testing photo in intro
    Then I should see an image with alt text "Team looking at a screen"

    Then I should see "Benefits of Science Gateways"
    Then I should see "Tailored to specific communities"
    Then I should see "Increase the usability of infrastructure and resources"
    Then I should see "Provide collaborative space"
    Then I should see "Support sharing of methods, code, data, results, and knowledge"
#TODO:test 4 icons^

    # testing learn more section
    Then I should see an image with alt text "Two people with a laptop"
    Then I should see "Learn More"
    Then I should see "Learn more about Science Gateways"
    # testing Link to Science Gateways
    When I am on "/tools/science-gateways"
    When I follow "Learn More"
    Then I should be on "https://sciencegateways.org/"




