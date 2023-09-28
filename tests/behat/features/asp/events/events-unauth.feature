@wip
@api
@javascript
Feature: test ACCESS Support Events Page and Individual Events Page
  The /events page lists upcoming events. Each event should display:
  - Title, linking to the individual event page
  - Event start date
  - Event start time and end time with timezone
  - Description
  TODO: Currently just testing headings. In future, create an event for testing that
  we can use to check that values are displaying as expected.
  The right side column displays:
  - View past events link
  - TODO: Options to filter events by type, skill level, affiliation, tag, and Affinity Group
  - TODO: A link to post a new event, redirects to login for anonymous
  - TODO: My Events block for authenticated, list with event title, date, and status
  The /past-events page lists past events. Each event should display:
  - TODO: Title, linking to the individual event page
  - TODO: Event start date
  - TODO: Event start time and end time with timezone
  - TODO: Description
  The right side column displays options to filter events by type, TODO: affiliation, and Affinity Group
  TODO: improve filter tests by adding cases where filters show a result
  An individual event page displays:
  - TODO: Event start and end date with timezone
  - Description
  - TODO: Contact
  - TODO: Location
  - TODO: Registration
  - TODO: Tags
  - TODO: Event Type
  - TODO: Affiliation
  - TODO: Skill level
  - TODO: Affinity Group
  - Link back to events page

  Scenario: Anonymous user tests the Events Page
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
    Then I should see "Skill Level"
    Then I should see "Affinity Group"
    When I press "edit-submit-recurring-events-event-instances--2"
    Then I should see "Posting Events"
    Then I should see "Do you have events or trainings you would like to"
    Then I should see "Add an Event"
    When I select "Training" from "edit-field-event-type-value--2"
    When I select "Community" from "Affiliation"
    When I select "Advanced" from "Skill Level"
    #edit-tid--2 is the term selection in filter by
    When I select "login" from "edit-tid--2"
    #edit-field-affinity-group-target-id-1--2 is the affinity group
    #When I select "ACCESS Support" from "field_affinity_group_target_id_1"
    When I press "edit-submit-recurring-events-event-instances--2"
    Then I should see "test-event-1"
    Then I should see "PuttingintoFail"
    When I click "View Past Events"
    Then I should be on "/past-events"

  Scenario: Anonymous test the Past Events page
    Given I am not logged in
    When I go to "/past-events"
    Then I should see "Past Events"
    And I should see "Filter by"
    #edit-field-event-type-value--2 is Event Type
    When I select "Training" from "edit-field-event-type-value--2"
    When I select "Community" from "Affiliation"
    #edit-field-affinity-group-target-id--2 is the affinity group
    When I select "Delta" from "edit-field-affinity-group-target-id--2"
    # TODO should this test then click the "Apply" button and verify results?
    When I press "edit-submit-recurring-events-event-instances--2"
    Then I should see "No events or trainings are currently scheduled."

  Scenario: Anonymous test of an individual event page
    Given I am not logged in
    When I go to "/events/17"
    Then I should see "Cybersecurity and Coding for Middle and High School Students"
    #TODO Title label?
    When I click "< Back to events"
    Then I should be on "/events"
