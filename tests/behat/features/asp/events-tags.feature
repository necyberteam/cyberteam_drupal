@asp
@api
@javascript

Feature: test ACCESS Support Tags Page
  In order to test the Tags Page

  Scenario: Unauthenticated user tests the Tags page and verifys that Events
    Given I am not logged in
    When I go to "/tags/science-gateway"
    Then I should see "Upcoming Events"
    Then I should see "Title"
    Then I should see "Gateways 2023"
    Then I should see "Date"
    Then I should see "10/30/2023"
    Then I should see "Time"
    Then I should see "1:00 PM EDT - 4:00 PM EDT"
    Then I should see "Tags"
    Then I should see "science gateway"
    Then I should see "Affinity Group"

  Scenario: Authenticated user tests creates events to test
    Given I am logged in as a user with the "administrator" role
    When I go to "/events/add"
    When I fill in "Title" with "Test"
    #When I fill in "Body" with "Test"
    #When I select "monthly_recurring_date" from "Recur Type"
    #When I fill in "Create Events Between" with "01/23/2052"
    When I fill in "Location" with "TestCity"
    When I fill in "Contact" with "Test"
    When I fill in "Registration" with "Test"
    When I fill in "Affinity Group" with "ACCESS Support (327)"
    When I fill in "Tag" with "login"
    When I select "Published" from "Save as"


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
