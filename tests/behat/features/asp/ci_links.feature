@asp
@api
@javascript

Feature: test ACCESS Support CI links


  Scenario: Authenticated user creates CI Link
    Given I am logged in as a user with the "authenticated" role
    When I am on "/ci-links"
    When I follow "Add new CI Link"
    When I fill in "Title" with "Test Link"
    When I fill in "Category" with "Tool"
    #When I press "access-account"
    #When I press "beginner"
    When I fill in "Description" with "testing"
    When I fill in "Link Title" with "link"
    When I fill in "Link URL" with "https://support.access-ci.org"
    Then I click "submit"
 
  Scenario: Unauthenticated user tests CI Links page
    Given I am not logged in
    When I go to "/ci-links"
    Then I should see "CI Links"
    Then I should see "These CI Links are crowd-sourced from the ConnectCI community"
    # unauthenticated people should have to log in before creating a ci link
    When I follow "Add new CI Link"
    Then I should be on "/user/login"
    # testing headings
    When I am on "/ci-links"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "tags"
    #When I follow "big-data"
    #Then I should be on "/tags/big-data"
    When I am on "/ci-links"
    Then I should see "Affinity Group"
    #When I follow "Anvil"
    #Then I should be on "/affinity-groups/anvil"
    Then I should see "Test Link"
    Then I should see "Skill level"
    Then I should see "Beginner"
    Then I should see "Intermediate"
    Then I should see "Advanced"
    Then I should see "Expert"
    #THERE ARE NO CI LINKS APPEARING ON THIS PAGE

  Scenario: Unauthenticated user tests a ci link
    When I am on "/ci-links"
    Then I should see "Title"
    #When I follow "Neurostars"
    #Then I should be on "/ci-links/3679"
    #Then I should see "documentation"
    #Then I should see "Beginner"
    #Then I should see "neurostars.org"
