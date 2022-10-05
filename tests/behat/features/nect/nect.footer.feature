@nect
@api
Feature: test footer
  In order to test the footer

  Scenario: User is on the homepage
    Given I am not logged in
    When I follow "Contact Us"
    Then I should be on "contact/northeast_cyberteam"
    And I should see "Northeast Cyberteam"