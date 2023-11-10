@templates
@api
@javascript

Feature: For an authenticated user, the Edit Account Page displays
  the first and last name of the user as its title. The page features
  tabs for navigating to "View" (user's profile page), "Edit" (current page), and "Security" (MFA setup page).
  The fields on the page include Program (region), Email Address, Roles (checkboxes for various roles),
  First Name, Last Name, Picture (file upload), Institution, CV/Resume (file upload), Time Zone (dropdown), and Citizenships.

Scenario: Authenticated user tests the edit account page
    Given I am logged in with email "pecan@pie.org"
    When I go to the homepage
    Then I should see "My profile"
    When I click "Edit my account"
    Then I should see "Pecan Pie"
    Then I should see "View"
    Then I should see "Edit"
    Then I should see "TFA"
    Then I should see "Program"
    Then I should see "Email Address"
    Then value of element "edit-mail" should contain "pecan@pie.org"
    Then I should see "Password strength"
    Then I should see "Confirm Password"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Picture"
    Then value of element "edit-field-institution-0-value" should contain "institution-for-pecan-pie"
    Then I should see "CV"
    Then I should see "Time Zone"
    Then I should see "Citizenships"

  Scenario: Authenticated user tests the add interest/skills page
    Given I am logged in with email "pecan@pie.org"
    When I go to "/community-persona"
    Then I should not see "access-acount"

    # toggle interest in "ACCESS-credits"
    When I go to "/community-persona/add-interest"
    Then I should see "Add Interest"
    When I click the element with selector "ACCESS-credits"
    When I go to "/community-persona"
    Then I should see "ACCESS-credits"
    When I go to "/community-persona/add-interest"
    When I click the element with selector "ACCESS-credits"
    When I go to "/community-persona"
    Then I should not see "ACCESS-credits"

    # toggle skill with "ACCESS-credits"
    When I go to "/community-persona/add-skill"
    When I click the element with selector "ACCESS-credits"
    When I go to "/community-persona"
    Then I should see "ACCESS-credits"
    When I go to "/community-persona/add-skill"
    When I click the element with selector "ACCESS-credits"
    When I go to "/community-persona"
    Then I should not see "ACCESS-credits"
