@templates
@api
@javascript

Feature: For an authenticated user, the Headers include:
  Top Menu bar
  Search bar
  The "Log In" and "Join" links are not shown.
  The User menu, automatically expanded in laptop/desktop screen sizes, displays two submenus:
  My Profile (links to the user's page)
  Add/Edit Interests (links to the add interests page)
  Add/Edit Skills (links to the add skills page)
  Edit My Account (links to the edit account page)
  Change Password (links to the password reset form)
  Project Submissions (links to the user's project submissions page)
  "Cyberteam Logo link" that redirects to the homepage.
  Each region site has its own logo linked accordingly.

  Scenario: Verify the Log Out button links to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I click "Log out"
    Then I should be on the homepage
    And I should see "Log in"

  Scenario: Verify the My profile button
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I click "My profile"
    Then I should see "Edit My Account"
    And I should see "Add/Edit Interests"
    And I should see "Add/Edit Skills"
    And I should see "Change Password"
    And I should see "Project Submissions"

  Scenario: Verify the Search field works as expected
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I fill in "keys" with "asdfasdfasdf"
    When I press "Search"
    Then I should be on "search/node"
    And I should see "asdfasdfasdf"
    And I should see "Your search yielded no results"
