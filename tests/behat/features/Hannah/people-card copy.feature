@templates--
@api
#@javascript

Feature: test people page
  In order to test the people page

  Scenario: Unauthenticated user tests the people page
    Given I am not logged in
    When I go to "people/card"
    Then I should see "People"
    And I should see "Filter By Program"
    And I should see "Search the people database"
    # TODO - not working
    # And I should see "Filter By Role"
    And I should see "Card View"
    And I should see "List View"
    When I fill in "Search the people database" with "Julie"
    And I wait 4 seconds
    Then I should see "Julie Ma"
    And I should see "MGHPCC"
    # When I hover over the "Filter by Program" link
    # Then I should see "All"