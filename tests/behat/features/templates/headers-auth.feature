@templates
@api
@javascript

Feature: verify headers for authenticated user
  To test headers
  As a authenticated user
  Verify Search, Log Off, My Profile 

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
    When I fill in "Search" with "asdfasdfasdf"
    When I press "Search"
    Then I should be on "search/node"
    And I should see "asdfasdfasdf"
    And I should see "Your search yielded no results"


