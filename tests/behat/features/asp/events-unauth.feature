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
    # TODO there's an apply button, not sure how to select it
    # Then I should see "Apply"
    Then I should see "Posting Events"
    Then I should see "Do you have events or trainings you would like to"
    Then I should see "Add an Event"
    # TODO not always shown on /events, perhaps due to paging
    # When I click "Cybersecurity and Coding for Middle and High School Students"
    # Then I should be on "/events/17"

    When I click "View Past Events"
    Then I should be on "/past-events"
    And I should see "Past Events"
    And I should see "Filter by"

    When I go to "/events/17"
    Then I should see "Cybersecurity and Coding for Middle and High School Students"
    #TODO Title label?
    When I click "< Back to events"
    Then I should be on "/events"

