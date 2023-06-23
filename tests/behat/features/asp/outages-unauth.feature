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
    And I wait 5 seconds
    Then I should see "Showing 1 to 10"
    When I select "100" from "outages-all_length"
    Then I should see "Anvil Cluster Maintenance"
    When I click "Anvil Cluster Maintenance"
    Then I should get a "200" HTTP response
    Then I should see "Anvil Cluster Maintenance"

