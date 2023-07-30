@templates
@api
@javascript

Feature: test ci-link page as a authenticated user
  In order to test the ci-links page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    And I wait 2 seconds
    When I fill in "edit-search--2" with "test-login-resource"
    And I wait 2 seconds
    When I click "test-login-resource"
    And I wait 2 seconds
    When I click "login"
    Then I should be on "/tags/login"
