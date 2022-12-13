@asp
@api
@javascript

Feature: test ACCESS Support knowledge base
  In order to test the knowledge base

  Scenario: Unauthenticated user tests the knowledge base
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Frequently Asked Questions"
    #TODO Button for drop down does not seem to work
    #When I click "collapseOne"
   # Then I should see "Visit the ACCESS HOME page to learn about all of the ACCESS"