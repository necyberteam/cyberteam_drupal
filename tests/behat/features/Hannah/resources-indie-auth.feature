@templates--
@api
@javascript
Feature: test recources page as a authenticated user
  In order to test the resource page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/resource/33"
    Then I should see "Test2"
    Then I should see "votes"
    Then I should see "login"
    Then I should see "Beginner"
    Then I should see "Testing Description"
    Then I should see "http://localhost:49185/form/resource"