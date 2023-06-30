@asp
@api
@javascript

Feature: test ACCESS Support CI links

  Scenario: Authenticated user creates test CI Links
    Given I am logged in as user "abrush"
    When I am on "/ci-links"
    When I follow "Add new CI Link"
    When I fill in "Title" with "Test Link"
    When I fill in "Category" with "Tool"
    When I press "access-account"
    When I press "beginner"
    When I fill in "Description" with "testing"
    When I fill in "Link Title" with "link"
    When I fill in "Link URL" with "https://support.access-ci.org"
    Then I should see "test"

  Scenario: Unauthenticated user tests CI Links page
    Given I am not logged in
    When I go to "/ci-links"
    Then I should see "CI Links"
    Then I should see "These CI Links are crowd-sourced from the ConnectCI community"
    When I follow "Add new CI Link"
    Then I should be on "/user/login"
    When I am on "/ci-links"
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "tags"
    Then I should see "Skill level"
    Then I should see "Affinity Group"
    Then I should see "Test Link"

