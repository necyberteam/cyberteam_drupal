@asp
@api
@javascript

Feature: test Additional Universal Navigation menu

  Scenario: test ACCESS home link
    Given I am not logged in
    When I am on the homepage
    When I follow "ACCESS Home"
    Then I should be on "https://access-ci.org/"



