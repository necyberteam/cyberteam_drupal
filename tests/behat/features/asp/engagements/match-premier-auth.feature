@asp
@api
@javascript

Feature: test the creation of MATCH Premier Engagements
  An authenticated user can create a new MATCH Premier engagement.
  TODO: AP to describe differences in premier from plus engagements.
  TODO: replicate match-plus testing for premier?  almost the same
  TODO: If the engagement is submitted or updated, the author is emailed.


  Scenario: authenticated user creates a MATCH premier Engagements
    Given I am logged in as a user with the "authenticated" role
    When I go to "/node/add/match_engagement?type=premier"
    Then I should see "Create premier Engagement"
    When I fill in "Project Title" with "Test987"
    When I fill in "Institution" with "Test"

    When I fill the rich textarea "edit-body-wrapper" with "Test987-description"
    Then I should see "Test987-description"

    When I click the element with selector "Select relevant tags"
    When I click the element with selector "access-acount"
    When I select "Fall Semester" from "edit-field-preferred-semester"
    When I select "Submitted" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test987 has been created."

