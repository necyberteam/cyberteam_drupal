@templates
@api
@javascript
Feature: test individual recources page 
  In order to test the individual resources page

  Scenario: Unauthenticated user Test the individual resource page
    Given I am not logged in
    When I go to "/resource/4"
    Then I should see "TEst"
    Then I should see "vote"
    Then I should see "login"
    Then I should see "Beginner"
    #Then I should see "Test Description"
    #Then I should see "Test Link Title"


