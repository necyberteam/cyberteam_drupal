@wip
@api
@javascript

Feature: test ACCESS Support Navigation Bar
  In order to test the Navigation Bar

  Scenario: Unauthenticated user tests the Navigation Bar
    Given I am not logged in
    When I go to "/outages"
    Then I should see "Current, Planned, and Past Downtimes"
    Then I should see "Outages"
    Then I should see "Current Outages"
    Then I should see "Event"
    Then I should see "Resource"
    Then I should see "Summary"
    Then I should see "Type"    
    Then I should see "Start"
    Then I should see "End"
    Then I should see "Planned Outages"
    Then I should see "There are no planned outages scheduled"
    Then I should see "All Outages"
    #TODO Figure out how to add below test
    #Then I should see "Show 10 Entries"
    When I fill in "Search" with "ACCESS"
    Then I should see "ACCESS Metrics XDMoD Update"
    When I fill in "Search" with ""
    Then I should see "Showing 1 to 1 of 1 entries"
    #TODO Paginitation test does not work
   # When I click "2"