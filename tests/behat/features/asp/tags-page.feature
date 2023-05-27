@asp
@api
@javascript

Feature: test ACCESS Support Tags Page
  In order to test the Tags Page

  Scenario: Unauthenticated user tests the Tags page and verifys that Announcements & Events are there
    Given I am not logged in
    When I go to "/tags/science-gateway"
    Then I should see "Announcements"
    Then I should see "Title"
    Then I should see "Gateways 2023 Call for Participation"
    Then I should see "Date"
    Then I should see "04/13/2023"
    Then I should see "Tags"
    Then I should see "science gateway"
    Then I should see "Affinity Group"
    Then I should see "Upcoming Events"
    Then I should see "Gateways 2023"
    Then I should see "10/30/2023"
    Then I should see "1:00 PM EDT - 4:00 PM EDT"

  Scenario: Unauthenticated user tests the Term selector on the Events Page
    Given I am not logged in
    When I go to "/events"
    Then I should see "Term"
    #edit-tid--2 is the Term selector
    When I select "science gateway" from "edit-tid--2"
    #edit-submit-recurring-events-event-instances--2 is the Apply button
    When I press "edit-submit-recurring-events-event-instances--2"
    And I wait 4 seconds
    Then I should see "Gateways 2023"

  Scenario: Unauthenticated user tests the Term selector on the Announcements Page
    Given I am not logged in
    When I go to "/announcements"
    Then I should see "Term"
    #edit-tid--2 is the Term selector
    When I select "science gateway" from "edit-tid--2"
    #edit-submit-access-news--2 is the Apply button
    When I press "edit-submit-access-news--2"
    And I wait 4 seconds
    Then I should see "Gateways 2023"
