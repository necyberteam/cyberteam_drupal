@templates
@api
@javascript

Feature: For an authenticated user, the Edit Account Page displays
  the first and last name of the user as its title. The page features
  tabs for navigating to "View" (user's profile page), "Edit" (current page), and "Security" (MFA setup page).
  The fields on the page include Program (region), Email Address, Roles (checkboxes for various roles),
  First Name, Last Name, Picture (file upload), Institution, CV/Resume (file upload), Time Zone (dropdown), and Citizenships.

  Scenario: Authenticated user tests the edit account page
    Given I am logged in as a user with the "authenticated" role
    When I go to the homepage
    Then I should see "My profile"
    When I click "Edit my account"
    #Cannot test user name
    #Then I should see "mrfYEeUO"
    Then I should see "View"
    Then I should see "Edit"
    Then I should see "TFA"
    Then I should see "Program"
    Then I should see "Email Address"
    Then I should see "Password strength"
    Then I should see "Confirm Password"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Picture"
    Then I should see "Institution"
    Then I should see "CV"
    Then I should see "Time Zone"
    Then I should see "Citizenships"

  Scenario: Authenticated user tests the add interest/skills page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/add-interest"
    Then I should see "darwin"
    Given I click the ".flag-element-name" element
    And I wait 2 seconds
    # TODO verify result?

    When I go to "/add-skill"
    Then I should see "darwin"
    Given I click the ".flag-element-name" element
    And I wait 2 seconds
    # TODO verify result?





