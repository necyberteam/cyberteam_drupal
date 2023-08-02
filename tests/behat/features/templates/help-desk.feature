@templates
@api
@javascript

Feature: Code of Conduct page

  Scenario: Verify essential features on code of conduct page
    Given I am not logged in
    When I go to "/help-desk"
    Then I should get a "200" HTTP response

