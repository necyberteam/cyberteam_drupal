@templates
@api
@javascript

Feature: test for the change password page 
  In order to test the change password page

  Scenario: Authenticated user tests the change password page
    Given I am logged in as a user with the "authenticated" role
    When I go to the homepage
    Then I should see "My Profile"
    When I click "Change Password"
    Then I should see "Password"
    Then I should see "View"
    Then I should see "Change Password"
    Then I should see "Edit"
    Then I should see "Security"
    Then I should see "Current Password"
    Then I should see "Password"
    Then I should see "Confirm Password"
