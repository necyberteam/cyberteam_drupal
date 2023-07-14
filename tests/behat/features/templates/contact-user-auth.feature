@templates
@api
@javascript
Feature: test contact user page
  In order to test the contact user page

  Scenario: Authenticated user tests the contact user page
    Given I am logged in as a user with the "authenticated" role
    When I go to "people/List"
    When I fill in "Search by Name" with "Julie Ma"
    And I wait 4 seconds
    Then I should see "Julie Ma"
    When I click "Julie"
    Then I should see "Julie Ma "
    When I click "contact_user"
    Then I should be on "/user/100/contact"
    Then I should see "Contact Julie Ma"
    When I click "Julie Ma"
    Then I should be on "/user/julie-ma"
    When I go to "/user/100/contact"
    #Then I should see element with "edit-subject-0-value" selector
    When I fill in "edit-subject-0-value" with "Test"
    #Message ID is edit-message-0-value
    When I fill in "edit-message-0-value" with "Test"
    #Checkbox ID is edit-copy
    Then I check "edit-copy"
    Then I should not see "reCaptcha"
    #op is the Submit button
    Then I click "op"
