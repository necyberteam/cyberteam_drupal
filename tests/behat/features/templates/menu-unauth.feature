@templates
@api
Feature: test navigation menus
  In order to test the navigation menus

  Scenario: Unauthenticated user navigates through navigation menus
    Given I am not logged in
    When I am on the homepage
    # TODO - broken
    Then I should see the link "About Us"
    And I should see the link "Community"
    And I should see the link "Get Help"
    And I should see the link "Projects"
    And I should see the link "Tags"
    When I click "About Us"
    Then I should see "About"
    When I am on the homepage
    When I click "Community"
    Then I should see "People"
    When I am on the homepage
    When I click "Get Help"
    Then I should see "Get Research Computing Help"
    When I am on the homepage
    When I click "Projects"
    Then I should see "Project"
    When I am on the homepage
    When I click "Tags"
    Then I should see "Tags"
