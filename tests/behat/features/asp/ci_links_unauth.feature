@asp
@api
@javascript

Feature: test ACCESS Support CI links

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

