# TODO - not working - commenting out whole test
@templates--
@api
@javascript
Feature: test people page Card view w/ filters 
  In order to test the people page from Card View

  Scenario: Unauthenticated user tests the people page in Card View and filters
    Given I am not logged in
    When I go to "people/Card"

    Then I should see "People"

    And I should see "Julie Ma"
    And I should see "Programs"
    And I should see "Roles"
    And I should see "Affinity Groups"
    And I should see "Skills"
    And I should see "List view"

    When I fill in "Search the people database" with "test"
    And I wait 4 seconds
    Then I should see "No matches found in People."



    When I fill in "Search the people database" with "julie"
    And I wait 4 seconds
    Then I should see "Julie Ma"
 


    When I fill in "Search the people database" with "Northeast"
    And I wait 4 seconds
    Then I should see "Northeast"

    When I fill in "Filter by Role" with "Student-facilitator"
    And I wait 4 seconds
    Then I should see "Student-facilitator"

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
    
     