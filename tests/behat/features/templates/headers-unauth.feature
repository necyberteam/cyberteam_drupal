@templates
@api
Feature: verify headers for non-authenticated user
  To test headers
  As a non-authenticated user
  Verify Search, Log In, Join 

  Scenario: Verify the Login button links to login flow
    Given I am not logged in
    When I am on the homepage
    When I click "Log in" 
    Then I should be on "user/login"
    And I should see "Please login with your Cyberteam account below"
    
  Scenario: Verify the Join button links to join 
    Given I am not logged in
    When I am on the homepage
    When I click "Join" 
    Then I should be on "user/register"
    And I should see "Please select an account type below to create"
    
  Scenario: Verify the Search field works as expected
    Given I am not logged in
    When I am on the homepage
    When I fill in "Search" with "asdfasdfasdf"
    When I press "Search"
    Then I should be on "search/node"
    And I should see "asdfasdfasdf"
    And I should see "Your search yielded no results"


