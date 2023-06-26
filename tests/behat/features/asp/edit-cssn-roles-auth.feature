@asp
@api
@javascript

Feature: test ACCESS Support domain cssn roles webform editing

  Scenario: Authenticated user tests editing cssn roles webform on ACCESS Support domain
    Given I am logged in as a user with the "administrator" role
    When I am on "/form/edit-your-cssn-roles"
    Then I should see "Mentor"
    Then I should see "Student"
    Then I should see "Research Computing Facilitator"
    Then I should see "Research Software Engineer"
    Then I should see "CI Systems Engineer"
    Then I should see "Researcher / Educator"
    # NOT SURE IF I NEED TESTS BELOW
    #When I click the "edit-roles-mentor" element
    #Then I should see element with "edit-submit" selector
    #When I click the "edit-submit" element
