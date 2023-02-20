@templates
@api
@javascript

Feature: test for the edit account page
  In order to test the edit account page

  Scenario: Authenticated user tests the edit account page
    Given I am logged in as a user with the "authenticated" role
    When I go to the homepage
    Then I should see "My Profile"
    When I click "Edit my account"
    #Cannot test user name
    #Then I should see "mrfYEeUO"
    Then I should see "View"
    Then I should see "Change Password"
    Then I should see "Edit"
    Then I should see "TFA"
    Then I should see "Program"
    Then I should see "Email Address"
    Then I should see "Roles"
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
    Then I should see "Add Interest"
    When I click "Add"
    Then I should see "Remove"
    When I go to "/add-skill"
    Then I should see "Add Skill"
    When I click "Add"
    Then I should see "Remove"


