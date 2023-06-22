@asp
@api
@javascript

Feature: test ACCESS Support Outages Page
  In order to test the Outages Page

  Scenario: Unauthenticated user tests the Outages Page
    Given I am not logged in
    When I go to "/outages"
    And I wait 2 seconds
    Then I should see "Current, Planned, and Past Downtimes"
    Then I should see "Outages"
    Then I should see "Current Outages"
    Then I should see "Event"
    Then I should see "Resource"
    Then I should see "Summary"
    Then I should see "Type"
    Then I should see "Start"
    Then I should see "End"
    Then I should see "Planned Downtimes"
    Then I should see "All Outages"
    # TODO Figure out how to add below test
    Then I should see "show"
    Then I should see "entries"
    #outages-planned_length needs testing
    # TODO search doesn't seem to be working
     When I fill in "Search" with "ACCESS"
     And I wait 5 seconds
     Then I should see "ACCESS User Identity"
     When I fill in "Search" with ""
     And I wait 5 seconds
    Then I should see "Showing 1 to 2 of 2 entries"
    # TODO Paginitation test does not work ID needs to be added in order to test
    # When I press "2"
