@asp
@api
@javascript

Feature: test /cssn-members page
  Administrators and match_pm roles can access the /cssn-members page
  and view a table of CSSN members.
  Information visible should be name, email, roles, CSSN roles, and institution.

  TODO: Test data fields are visible.
  TODO: Test with MATCH PM role
  TODO: Administrators and match_pm roles can download a CSV at /cssn-export
  TODO: Authenticated people cannot view this page.

  Scenario: Administrator user tests cssn members page
    Given I am logged in as a user with the "administrator" role
    When I go to "/cssn-members"
    And I wait 4 seconds
    Then I should see "CSSN Members"

