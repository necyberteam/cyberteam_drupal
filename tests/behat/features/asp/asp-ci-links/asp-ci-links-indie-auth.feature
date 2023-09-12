@asp
@api
@javascript

Feature: test ci-link page as a authenticated user
  In order to test the ci-links page as an authenticated user

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    And I wait 2 seconds
    Then I should see "Test"
    When I click "TEST"
    Then I should see "TEST"
    Then I should see "login"
    Then I should see an image with alt text "Beginner"
    Then I should see "Test"
    When I click the "a[href='http://example.com']" element
    Then I should get a "200" HTTP response
