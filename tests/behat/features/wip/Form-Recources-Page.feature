@templates
@api
@javascript
Feature: test recources page 
  In order to test the Add resource page

  Scenario: Authenticated user fills out Recource Form 
    Given I am logged in as a user with the "authenticated" role
    When I go to "/form/resource"
    Then I should see "Resource"
    When I fill in "Title" with "TEST"
    When I select "Tool" from "Category"
    When I check "login"
    When I check "Beginner"
    When I fill in "Description" with "TEST"
    When I press "Submit"
    Then I should see "Test"
    







