@templates
@api
@javascript
Feature: test individual recources page 
  In order to test the individual resources page

  Scenario: Unauthenticated user Test the individual resource page
    Given I am not logged in
    When I go to "/resource/33"
    Then I should see "Test2"
    Then I should see "votes"
    Then I should see "login"
    Then I should see "Beginner"
    Then I should see "Testing Description"
    Then I should see "http://localhost:49185/form/resource"


