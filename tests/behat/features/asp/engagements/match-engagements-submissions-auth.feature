@wip
@api
@javascript

Feature: MATCH Engagements submissions page
  The MATCH Engagement Submissions page has a table listing submissions
  This page should be viewable by match_pm and match_sc roles TODO: but not authenticated
  Displaying:
  - Link to edit
  - Status
  - Title with link to view
  - Team with links to community persona for researcher(s), student(s), mentor(s), and consultant
  - Launch presentation date
  - Wrap presentation date

  Submissions can be filtered by status

  Scenario: User with Match SC role
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    Then I should see "Any"
<<<<<<< HEAD
<<<<<<< HEAD
=======
    When I select "Recruiting" from "Status"
<<<<<<< HEAD
>>>>>>> 558b40af (Update match-engagements-submissions-auth.feature)
=======
>>>>>>> cee1125c (Update match-engagements-submissions-auth.feature)
    # TODO: if engagements are recruiting currently this causes an error.
    # Don't actually filter.
    # And I press "Apply"
    # And I wait 3 seconds
<<<<<<< HEAD
=======
=======
    When I select "Any" from "Status"
    And I press "Apply"
    And I wait 3 seconds
>>>>>>> bde4897f (updating to use status of Any)
    Then I should see "Edit"
>>>>>>> cee1125c (Update match-engagements-submissions-auth.feature)

    Then I should see "Status"
    Then I should see "Any"
    Then I should see "Match Title"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should see "Team"
    Then I should see "Researcher: Ilya Zaslavsky"
    Then I should see "Launch"
    Then I should see "Presentation Date:"
    Then I should see "Wrap"

    When I click "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should be on "/node/445"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"

    When I click "Edit"
    Then I should be on "/node/445/edit"
    When I press "Save"
    Then I should be on "/node/445"

    #TODO: test team column displays mentor, student, consultant, and steering committee assignments
    # see https://cyberteamportal.atlassian.net/browse/D8-1593

  Scenario: MATCH PM role test match engagements submissions page
    Given I am logged in as a user with the "match_pm" role
    When I go to "/match-engagements-submissions"
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0ff8b2bb (Adding in other features to test)
    Then I should see "Any"
    When I select "Recruiting" from "Status"
<<<<<<< HEAD
<<<<<<< HEAD
    And I press "Apply"
    And I wait 3 seconds
<<<<<<< HEAD
=======
    # And I press "Apply"
    # And I wait 3 seconds
>>>>>>> 558b40af (Update match-engagements-submissions-auth.feature)
    Then I should see "Edit"
    Then I should see "Status"
    # Then I should see "Recruiting"
    Then I should see "Match Title"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should see "Team"
    Then I should see "Researcher: Ilya Zaslavsky"
    Then I should see "Launch"
    Then I should see "Presentation Date:"
    Then I should see "Wrap"
=======
=======
>>>>>>> 0ff8b2bb (Adding in other features to test)
=======
    #And I press "Apply"
    #And I wait 3 seconds
>>>>>>> cee1125c (Update match-engagements-submissions-auth.feature)
    Then I should see "Edit"
    Then I should see "Status"
    #Then I should see "Recruiting"
    Then I should see "Match Title"
<<<<<<< HEAD
>>>>>>> a8dcba84 (Testing in github to see errors)
=======
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should see "Team"
    Then I should see "Researcher: Ilya Zaslavsky"
    Then I should see "Launch"
    Then I should see "Presentation Date:"
    Then I should see "Wrap"
>>>>>>> 0ff8b2bb (Adding in other features to test)

    When I click "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should be on "/node/445"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
<<<<<<< HEAD
<<<<<<< HEAD
    When I click "Edit"
    Then I should be on "/node/445/edit"
    When I press "Save"
    Then I should be on "/node/445"

=======

=======
>>>>>>> 0ff8b2bb (Adding in other features to test)
    When I click "Edit"
    Then I should be on "/node/445/edit"
    When I press "Save"
    Then I should be on "/node/445"

  Scenario: Admin with Authenticated role test match engagements submissions page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/match-engagements-submissions"
    Then I should see "Any"
    When I select "Any" from "Status"
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

    When I click "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    Then I should be on "/node/445"
    Then I should see "Adapting a GEOspatial Agent-based model for Covid Transmission (GeoACT) for general use"
    When I click "Edit"
    Then I should be on "/node/445/edit"
    Then I should see "MATCH Steering Committee member"
    When I press "Save"
    Then I should be on "/node/445"
