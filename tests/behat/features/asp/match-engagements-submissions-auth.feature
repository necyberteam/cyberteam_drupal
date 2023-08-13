@asp
@api
@javascript

Feature: testing match engagements submissions for Match SC role

  Scenario: Admin with Match SC role test match engagements submissions page
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    Then I should see "Edit"

    Then I should see "Status"
    Then I should see "Match Title"

    When I click "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should be on "/node/445"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"

    When I click "Edit"
    Then I should be on "/node/445/edit"

    #TODO: test team column displays mentor, student, consultant, and steering committee assignments
    # see https://cyberteamportal.atlassian.net/browse/D8-1593
