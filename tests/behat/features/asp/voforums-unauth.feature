@asp
@api
@javascript

Feature: test ACCESS Support knowledge base
  In order to test the knowledge base

  Scenario: Unauthenticated user tests the knowledge base
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Visit our Forums"
    Then I should see "ACCESS Support is partnering with the Ask.CI Q&A Platform"
    Then I should see "Jetstream"
    Then I should see "ACCESS Allocations"
    Then I should see "Bridges-2"
    Then I should see "Large data sets"
    Then I should see "Quantum Computing"
    Then I should see "Cloud Computing"
    Then I should see "See all Forums"
    #TODO Button is not working ?
    #When I click "See all forums"