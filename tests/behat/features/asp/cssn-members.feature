@asp
@api
@javascript

Feature: test ACCESS Support domain cssn members page

  Scenario: Authenticated user tests cssn members page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/cssn-members"
    Then I should see "CSSN Members"
    When I select "Completed" from "action"
    When I check "webform_submission_bulk_form[2]"
    When I press "op"

