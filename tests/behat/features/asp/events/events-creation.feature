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

  Scenario: Administrator sets pecan@pie to a affinity group leader role
    Given I am logged in as a user with the "administrator" role
    When I go to "/admin/people?user=pecan%40pie.org&status=All&role=All&permission=All&field_is_cc_value=All&field_region_target_id=All"
    When I fill in "edit-user" with "pecan@pie.org"
    #edit-submit-user-admin-people is the filter button
    When I press "edit-submit-user-admin-people"
    And I wait 3 seconds
    When I click "Edit"
    When I check "Affinity Group Leader"
    And I press "Save"

  Scenario: pecan@pie.org user tests the Events Page
    Given I am logged in with email "pecan@pie.org"
    When I go to "/events/add"
    Then I should see "Create Access Event"
    When I fill in "Title" with "test-event-1"
    When I fill the rich textarea "edit-body-wrapper" with "testing body field"
    #edit-recur-type-custom is the ID for Custom/Single Event
    When I click the "#edit-recur-type-custom" element
    #TODO: Not able to test date selection. Issue not created yet
    #When I fill in "#edit-custom-date-0-value-date" with "10/10/2030"
    When I fill in "Location" with "Zoom"
    When I fill in "Contact" with "Pecan Pie"
    When I fill in "Registration" with "https://test-accessmatch.pantheonsite.io/form/join-the-cssn-network"
    #Set PecanPie as a coordinator of a affinity group
    #When I fill in "Affinity Group" with "ACCESS Support"
    When I fill in "Tags" with "login (682)"
    When I select "Training" from "Event Type"
    When I select "Community" from "Affiliation"
    When I select "Advanced" from "Skill Level"
    When I select "Published" from "Save as"
    When I wait 3 seconds
    When I press "Save"
    When I go to "/events"
    Then I should see "My Events"
    Then I should see "Status"

  #Scenario: Anonymous user tests the Events Page
  #  Given I am not logged in
  #  When I go to "/Events"
   # Then I should see "efuiewwbe"
