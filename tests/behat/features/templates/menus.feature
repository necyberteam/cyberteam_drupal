@templates
@api
Feature: test navigation menus
  In order to test the navigation menus

  Scenario: Unauthenticated user navigates through navigation menus
    Given I am not logged in
    When I am on the homepage
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

  Scenario: Authenticated user navigates through navigation menus
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
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

  Scenario: About Us pages have expected content
    Given I am not logged in
    When I am on "about-us/user-guide"
    Then I should see "Welcome to the Cyberteam Portal Users Guide!"
    When I am on "about-us/affinity-groups-faq"
    Then I should see "Affinity Groups encourage community members to gather"
    When I am on "code-conduct"
    Then I should see "ACCESS welcomes and encourages participation in our community by people of all backgrounds and identities"
    When I am on "news"
    Then I should see "Published Articles"
