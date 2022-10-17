@wip--#Put comment in spreadsheet tha this cant be tested
@api
@javascript
Feature: test individual Affinity Group page 
  In order to test the Affinity Group page

  Scenario: Authenticated user Test the Affinity Group page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/user/2026/change-password"

    
    #What would be the domain 
    Then I should see "Password"