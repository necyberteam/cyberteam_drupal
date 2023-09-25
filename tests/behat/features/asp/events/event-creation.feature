@asp
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
    Given I am logged in with email "pecan@pie.org"
    When I go to "/events/add"
    Then I should see "Create Access Event"
    When I fill in "Title" with "test-event-1"
    #P is the body field
    When I fill in "p" with "testing body field"
    #edit-recur-type-custom is the ID for Custom/Single Event
    When I click the "#edit-recur-type-custom" element
    #TODO: Not able to test date selection. Issue not created yet
    #When I fill in "#edit-custom-date-0-value-date" with "10/10/2030"
    When I fill in "Location" with "Zoom"
    When I fill in "Contact" with "Pecan Pie"
    When I fill in "Registration" with "https://test-accessmatch.pantheonsite.io/form/join-the-cssn-network"
    When I fill in "Affinity Group" with "ACCESS Support"
    When I fill in "Tags" with "login (682)"
    When I select "Training" from "Event Type"
    When I select "Community" from "Affiliation"
    When I select "Advanced" from "Skill Level"
    When I select "Ready for Review" from "Save as"
    When I wait 3 seconds
    When I press "Save"
    And I wait 3 seconds
