@asp
@api
@javascript

Feature: test the creation of MATCH Engagements
  MATCH engagements can be created by authenticated people.
  TODO: If the engagement is submitted or updated, the author is emailed.

  Scenario: authenticated user creates a match-plus engagement
    Given I am logged in as a user with the "authenticated" role
    When I go to "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "t224"
    When I select "Submitted" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement t224 has been created."

  Scenario: authenticated user creates a MATCH premier Engagements
    Given I am logged in as a user with the "authenticated" role
    When I go to "/node/add/match_engagement?type=premier"
    Then I should see "Create premier Engagement"
    When I fill in "Project Title" with "Test456"
    When I fill in "Institution" with "Test"
    When I select "Start within 3 months" from "edit-field-urgency"
    Then I should see "Description"
    When I select "Submitted" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test456 has been created."


# The following TODO was created at some point in the past,
# but I'm not sure what it means, but leaving in case still relevant.
# Jasper, 9/1/2023

  Scenario: steering committee field should be read-only
    #TODO
