@templates
@api
@javascript
Feature: For anonymous & authenticated user, the Menu Items include:
  About Us link (redirects to the about us page)
  Community link
  Get Help page link (redirects to the Get Research Computing Help page)
  Projects page link (redirects to the projects/engagements page)
  Tags page link (redirects to the tags list page)

  Scenario: Unauthenticated user navigates through navigation menus
    Given I am not logged in
    When I am on the homepage
    # TODO - broken
    #Menu tab is in mobile form
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
    # TODO - broken
    #Menu tab is in mobile form
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

