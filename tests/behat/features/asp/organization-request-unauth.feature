@asp
@api
@javascript

Feature: The Organization Request Form includes fields for
"Your name," "Your email," and "Your organization."

  Scenario: Unauthenticated user tests the Organization Request Form
    Given I am not logged in
    When I go to "/form/organization-request"
    When I fill in "edit-your-name" with "Test"
    When I fill in "edit-your-email" with "Test@email.com"
    When I fill in "edit-your-organization" with "Test Organization"
    And I wait 5 seconds
    When I press "edit-submit"
    And I wait 5 seconds
    Then I should see "Thanks for submitting your request"
