@asp
@api
@javascript

Feature: test the creation of MATCH Engagements
  TODO: replicate match-plus testing for premier?  almost the same
  TODO: If the engagement is submitted or updated, the author is emailed.


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

