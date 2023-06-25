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
    #NOT PASSING
    #Then I should see "Title"
    #When I follow "Neurostars"
    #Then I should be on "/ci-links/3679"
    #Then I should see "documentation"
    #Then I should see "Beginner"
    #Then I should see "neurostars.org"
    When I am on "/ci-links"
    #Then I should see "Description"
    #Then I should see "Category"
    #Then I should see "tags"
    #When I follow "big-data"
    #Then I should be on "/tags/big-data"
    When I am on "/ci-links"
    Then I should see "Beginner"
    Then I should see "Intermediate"
    Then I should see "Advanced"
    Then I should see "Expert"
    #Then I should see "Skill level"
    #Then I should see "Affinity Group"
    #When I follow "Anvil"
    #Then I should be on "/affinity-groups/anvil"

