@wip
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
    Then I should see "Show"
    #Then I should see element with "outages-planned_length" selector
    Then I should see "entries"
    # TODO search doesn't seem to be working
    # When I fill in "Search" with "ACCESS"
    # Then I should see "ACCESS Metrics XDMoD Update"
    # When I fill in "Search" with ""
    # Then I should see "Showing 1 to 1 of 1 entries"
    # TODO Paginitation test does not work
    # When I click "2"
    Then I should see "show"
    Then I should see "entries"
    #outages-planned_length needs testing
    And I wait 5 seconds
    Then I should see "Showing 1 to 10"
    When I select "100" from "outages-all_length"
    Then I should see "Anvil Cluster Maintenance"
    When I click "Anvil Cluster Maintenance"
    Then I should get a "200" HTTP response
    Then I should see "Anvil Cluster Maintenance"
