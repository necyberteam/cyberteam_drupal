@asp
@api
@javascript

Feature: MATCH Engagements submissions page
  The MATCH Engagement Submissions page has a table listing submissions
  This page should be viewable by match_pm and match_sc roles but not authenticated
  Displaying:
  - Link to edit
  - Status
  - Title with link to view
  - Team with links to community persona for researcher(s), student(s), mentor(s), and consultant
  Submissions can be filtered by status


  Scenario: Anonymous user cannot see submissions
    Given I am not logged in
    When I go to "/match-engagements-submissions"
    Then I should be on "user/login?destination=/match-engagements-submissions"


  Scenario: User with Match SC role
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    Then I should see "Any"
    When I select "Any" from "Status"
    And I wait 1 seconds
    And I press "Apply"
    And I wait 3 seconds
    Then I should see "Edit"

    Then I should see "Status"
    Then I should see "Any"
    Then I should see "Match Title"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should see "Team"
    Then I should see "Researcher: Ilya Zaslavsky"
    Then I should see "Launch"
    Then I should see "Presentation Date:"
    Then I should see "Wrap"

    # view node "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I am on "/node/445"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"

    #TODO: test team column displays mentor, student, consultant, and steering committee assignments
    # see https://cyberteamportal.atlassian.net/browse/D8-1593

    When I am on "/match-engagements-submissions"
    Then I should see "Team"
    Then I should see "Researcher: Yanni Chen"
    Then I should see "Mentor: Cesar Sul"
    Then I should see "Students: Alexandra Lamtyugina"
    Then I should see "Steering Committee: Aaron Culich"

    # filter by "Halted"
    When I select "Halted" from "Status"
    And I wait 1 seconds
    And I press "Apply"
    And I wait 3 seconds
    Then I should see "Stock Return Predictability"


  Scenario: MATCH PM role test match engagements submissions page
    Given I am logged in as a user with the "match_pm" role
    When I go to "/match-engagements-submissions"
    Then I should see "Any"
    When I select "Any" from "Status"
    And I wait 1 seconds
    And I press "Apply"
    And I wait 3 seconds
    Then I should see "Edit"
    Then I should see "Status"
    Then I should see "Any"
    Then I should see "Match Title"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should see "Team"
    Then I should see "Researcher: Ilya Zaslavsky"
    Then I should see "Launch"
    Then I should see "Presentation Date:"
    Then I should see "Wrap"

    # view node "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I am on "/node/445"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    When I click "Edit"
    Then I should be on "/node/445/edit"
    Then I should see "MATCH Steering Committee member"
