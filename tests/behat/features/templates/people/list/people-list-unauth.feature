@templates
@api
@javascript
Feature: test people page list view w/ filters
  In order to test the people page from List View

  Scenario: Unauthenticated user tests the people page
    Given I am not logged in
    When I go to "people/List"


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

    When I fill in "Filter by Role" with "Mentor"
    And I wait 4 seconds
    Then I should see "Mentor"

    When I fill in "Filter by Role" with "Researcher/Educator"
    And I wait 4 seconds
    Then I should see "Researcher/Educator"

    When I fill in "Filter by Role" with "Steering Committee"
    And I wait 4 seconds
    Then I should see "Steering Committee"

    When I fill in "Filter by Role" with "Regional Facilitator"
    And I wait 4 seconds
    Then I should see "Regional Facilitator"

    When I fill in "Filter by Role" with "Student-facilitator"
    And I wait 4 seconds
    Then I should see "Student-facilitator"
    Then I should see "rcf"
