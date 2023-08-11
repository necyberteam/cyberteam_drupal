@asp
@api
@javascript

Feature: test ACCESS Support Events Page and Individual Events Page
  In order to test the Events Page and Individual Events Page

  Scenario: Unauthenticated user tests the Events Page and Individual Events Page
    Given I am not logged in
    When I go to "/Events"
    Then I should see "Events and Training"
    Then I should see "Title"
    Then I should see "Date"
    Then I should see "Time"
    Then I should see "Description"
    Then I should see "Filter by"
    Then I should see "Event Type"
    Then I should see "Affiliation"
    Then I should see "Affinity Group"
    When I press "edit-submit-recurring-events-event-instances--2"
    Then I should see "Posting Events"
    Then I should see "Do you have events or trainings you would like to"
    Then I should see "Add an Event"

    When I click "View Past Events"
    Then I should be on "/past-events"
    And I should see "Past Events"
    And I should see "Filter by"
    #edit-field-event-type-value--2 is Event Type
    When I select "Training" from "edit-field-event-type-value--2"
    When I select "Community" from "Affiliation"
    #edit-field-affinity-group-target-id--2 is the affinity group
    When I select "Delta" from "edit-field-affinity-group-target-id--2"


    When I go to "/events/17"
    Then I should see "Cybersecurity and Coding for Middle and High School Students"
    #TODO Title label?
    When I click "< Back to events"
    Then I should be on "/events"

