@asp
@api
@javascript

Feature: Authenticated User testing on homepage

  Scenario: authenticated User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should be on the homepage
