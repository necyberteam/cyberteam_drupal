@champ
@api
@javascript

Feature: test for the front page

  Scenario: Test the front page
    Given I am not logged in
    When I am on the homepage
    Then I should see an image with alt text "Campus Champions"
    # TODO find way to tests stats on this page
    Then I should see "Champions Nationionwide"
    Then I should see "Institutions Represented"
    Then I should see "Institutions in EPSCoR States"
    Then I should see "Minority Serving Institutions"
    Then I should see "Quick Links"
    Then I should see "Join"
    Then I should see "About Us"
    Then I should see "Find Champions"
    Then I should see "Affinity Groups"
    Then I should see "CI Links"
    Then I should see "Advancing Science"
    Then I should see "Creating Community"
    Then I should see "Building Knowledge"

    Then I should see "Become a Champion"
    Then I should see "Information Sharing"
    Then I should see "Research Community"
    Then I should see "Help with ACCESS allocations"
    Then I should see "Find other Champions"
    Then I should see "Beyond the all-Champions calls"
    Then I should see an image with alt text "Join Affinity Groups"

    When I click "Find Champions"
    And I wait 4 seconds
    Then I should be on "/champions/current-campus-champions"

    When I am on the homepage
    And I click "Join Affinity Groups"
    And I wait 4 seconds
    Then I should be on "/affinity-groups"
