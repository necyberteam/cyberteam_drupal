@asp
@api
@javascript

Feature: testing match engagements submissions for Match SC role

  Scenario: Admin with Match SC role test match engagements submissions page
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    Then I should see "Any"
    When I select "Recruiting" from "Status"
    And I press "Apply"
    And I wait 3 seconds
    Then I should see "Edit"

    Then I should see "Status"
    Then I should see "Recruiting"
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

  Scenario: Admin with Match PM role test match engagements submissions page
    Given I am logged in as a user with the "match_pm" role
    When I go to "/match-engagements-submissions"
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0ff8b2bb (Adding in other features to test)
    Then I should see "Any"
    When I select "Recruiting" from "Status"
    And I press "Apply"
    And I wait 3 seconds
<<<<<<< HEAD
    Then I should see "Edit"
    Then I should see "Status"
    Then I should see "Recruiting"
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
    Then I should see "Edit"
    Then I should see "Status"
    Then I should see "Recruiting"
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
    When I select "Recruiting" from "Status"
    And I press "Apply"
    And I wait 3 seconds
    Then I should see "Edit"
    Then I should see "Status"
    Then I should see "Recruiting"
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
