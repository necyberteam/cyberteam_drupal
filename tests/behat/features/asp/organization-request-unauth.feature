@asp
@api
@javascript

Feature: test ACCESS Support Organization Request Form
  In order to test the Organization Request Form

  Scenario: Unauthenticated user tests the Organization Request Form
    Given I am not logged in
    When I go to "/form/organization-request"
    When I fill in "edit-your-name" with "Test"
    When I fill in "edit-your-email" with "Test@email.com"
    When I fill in "edit-your-organization" with "Test Organization"
    #Submit button is not working
    #When I click "SUBMIT"