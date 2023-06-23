@asp
@api
@javascript

Feature: test ACCESS resources with the same tags

  Scenario: Unauthenticated user tests resources with a tag page
    Given I am not logged in
    When I am on "/term/272/ci-links"
    Then I should see "CI Links tagged machine-learning"
    Then I should see "Title"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    When I follow "ACCESS HPC Workshop Series"
    Then I should be on "/ci-link/3401"
    When I am on "/term/272/ci-links"
    When I follow "ai"
    Then I should be on "/tags/ai"
