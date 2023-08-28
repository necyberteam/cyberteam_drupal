@wip-
@api
@javascript

Feature: wip

  Scenario: wip
    When I go to "/ondemand"
    When I click "Join Us"
    And I wait 4 seconds
    Then I should be on "https://discourse.openondemand.org/"
