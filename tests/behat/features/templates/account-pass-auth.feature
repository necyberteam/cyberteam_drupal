@templates
@api
@javascript

Feature: For an authenticated user, the Change Password Page includes tabs for
navigating to "View" (user's profile page), "Change Password" (this page), "Edit" (the edit profile page),
and "Security" (MFA setup page). The page prompts the user to enter their current password and then confirm the new password.


  Scenario: Authenticated user tests the change password page
    Given I am logged in as a user with the "authenticated" role
    When I go to the homepage
    Then I should see "My Profile"
    When I click "Change Password"
    Then I should see "Password"
    Then I should see "View"
    Then I should see "Change Password"
    Then I should see "Edit"
    Then I should see "TFA"
    Then I should see "Current Password"
    Then I should see "Password"
    Then I should see "Confirm Password"
