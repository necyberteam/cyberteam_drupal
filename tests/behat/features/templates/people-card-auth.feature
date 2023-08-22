@templates
@api
@javascript

Feature: test people page Card view w/ filters
  In order to test the people page from Card View
  TODO:  make sure this test verifies the following:
    Search works on people’s first and last names as expected
    Roles radio buttons
      Student-facilitator restricts search results to accounts with the student-facilitator role
      Mentor restricts search results to accounts with the mentor role
      Researcher/Educator restricts search results to accounts with the researcher/educator role
      Steering Committee restricts search results to accounts with the steering committee role
      Regional Facilitator restricts search results to accounts with the regional facilitator role

  Scenario: Authenticated user tests the people page in Card View and filters
    Given I am logged in as a user with the "authenticated" role
    When I go to "/people/card"

    Then I should see "People"


    And I should see "Programs"
    And I should see "Roles"
    When I fill in "roles_target_id[]" with "ci systems engineer"
    And I should see "Affinity Groups"
    And I should see "Skills"
    And I should see "List view"

    When I fill in "Search the people database" with "testing123"
    And I wait 4 seconds
    Then I should see "No matches found in People."



    When I fill in "Search the people database" with "julie"
    And I wait 4 seconds
    Then I should see "Julie Ma"



    When I fill in "Search the people database" with "Northeast"
    And I wait 4 seconds
    Then I should see "Northeast"

    When I fill in "Search the people database" with " "
    And I wait 4 seconds

    When I fill in "edit-roles-target-id--2" with "Student-facilitator"
    And I wait 10 seconds
    Then I should see "Student-facilitator"

    When I fill in "edit-roles-target-id--2" with "Mentor"
    And I wait 10 seconds
    Then I should see "Mentor"

    When I fill in "edit-roles-target-id--2" with "Researcher/Educator"
    And I wait 10 seconds
    Then I should see "Researcher/Educator"

    When I fill in "edit-roles-target-id--2" with "Steering Committee"
    And I wait 10 seconds
    Then I should see "Steering Committee"

    When I fill in "edit-roles-target-id--2" with "Regional Facilitator"
    And I wait 10 seconds
    Then I should see "Regional Facilitator"

    When I fill in "edit-roles-target-id--2" with "Student-facilitator"
    And I wait 10 seconds
    Then I should see "Student-facilitator"
