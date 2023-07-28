@asp
@api
@javascript

Feature: test ACCESS Support domain cssn roles webform editing

  Scenario: Authenticated user tests editing cssn roles webform on ACCESS Support domain
    Given I am logged in as a user with the "authenticated" role
    When I am on "/form/edit-your-cssn-roles"
    Then I should see "Mentor"
    Then I should see "Student"
    Then I should see "Research Computing Facilitator"
    Then I should see "Research Software Engineer"
    Then I should see "CI Systems Engineer"
    Then I should see "Researcher / Educator"

    When I check "edit-roles-mentor"
    When I check "edit-roles-student"
    # select2-edit-academic-status-select2-container is the Academic Status dropdown

    When I select "1st year undergraduate" from "academic_status_select2"

    When I press "Submit"
    And I wait 4 seconds
    Then I should see "Thank you for updating your roles."

    When I go to "community-persona"
    Then I should see "mentor"
    And I should see "student-facilitator"


