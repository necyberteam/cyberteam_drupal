@templates
@api
@javascript
Feature: On the Individual CI Link Page for authenticated users,
the page features the Resource's title along with details such as Votes
(users can vote or rescind votes), Tags (linked to respective tag pages),
Skill Level(s), Description, and any links associated with the resource,
with links redirecting to their respective addresses.

  Scenario: Authenticated user Test the resource page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/knowledge-base/ci-links"
    And I wait 2 seconds
    Then I should see "Test CI Link Title"
    When I click the "summary:nth-child(1) > div:nth-child(1)" element
    Then I should see "login"
    Then I should see an image with alt text "Beginner"
    Then I should see "Test"
    When I click the "a[href='http://example.com']" element
    Then I should get a "200" HTTP response
