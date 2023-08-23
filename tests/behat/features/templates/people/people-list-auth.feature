@templates
@api
@javascript
Feature: This Behat test is authenticated and goes over the People Page - List Views, the features remain consistent:
searching by first and last names (case-insensitive) with a message for no results, and a table displaying
names (linked), profile images, roles, institutions, and tags. The Roles radio buttons allow role-specific filtering.

  Scenario: Authenticated user tests the people page
    Given I am logged in as a user with the "authenticated" role
    When I go to "people/list"
    And I wait 4 seconds
    Then I should see "People"
    And I should see "Picture"
    And I should see "First Name"
    And I should see "Last Name"
    And I should see "Institution"
    And I should see "Program"
    And I should see "Roles"
    And I should see "Affinity Groups"
    And I should see "Tags"

    And I should see "Card view"

    When I fill in "Search by Name" with "test123"
    And I wait 4 seconds
    Then I should see "There are currently no People"

    When I fill in "Search by Name" with "Julie"
    And I wait 4 seconds
    Then I should see "Julie Ma"

    When I fill in "Search by Name" with "Northeast"
    And I wait 4 seconds
    Then I should see "Northeast"
    When I fill in "Search by Name" with " "

    When I fill in "Filter by Role" with " "
    And I wait 4 seconds

    When I fill in "Filter by Role" with "Mentor"
    And I wait 4 seconds
    Then I should see "Mentor"

    When I fill in "Filter by Role" with " "
    And I wait 4 seconds

    When I fill in "Filter by Role" with "Researcher/Educator"
    And I wait 4 seconds
    Then I should see "Researcher/Educator"

    When I fill in "Filter by Role" with " "
    And I wait 4 seconds

    When I fill in "Filter by Role" with "Steering Committee"
    And I wait 4 seconds
    Then I should see "Steering Committee"

    When I fill in "Filter by Role" with " "
    And I wait 4 seconds

    When I fill in "Filter by Role" with "Regional Facilitator"
    And I wait 4 seconds
    Then I should see "Regional Facilitator"

    When I fill in "Filter by Role" with " "
    And I wait 4 seconds

    When I fill in "Filter by Role" with "Student-facilitator"
    And I wait 4 seconds
    Then I should see "student facilitator"

    When I fill in "Filter by Role" with " "
    And I wait 4 seconds

    When I fill in "Filter by Role" with "rcf"
    And I wait 4 seconds
    Then I should see "rcf"
