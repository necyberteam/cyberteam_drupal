@asp
@api
@javascript

Feature: test ACCESS Support domain cssn members page

  Scenario: Administrator user tests cssn members page
    Given I am logged in as a user with the "administrator" role
    When I go to "/cssn-members"
    And I wait 4 seconds
    Then I should see "CSSN Members"
    When I select "Completed" from "action"
    When I check "webform_submission_bulk_form[2]"
    When I press "op"

