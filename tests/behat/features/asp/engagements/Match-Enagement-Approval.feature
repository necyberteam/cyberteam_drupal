@asp
@api
@javascript

Feature: test the approval proccess of MATCH Engagements
  MATCH engagements can be created by authenticated people.
  TODO: Fields include:
  - Title
  - Institution
  - Urgency
  - Description
  - Tags
  TODO: The engagement can be saved as a "Draft" or "Submitted" for review.
  When the engagement is submitted, match_sc receives email.
  TODO: match_sc role can save as "Received", "Draft", or "Declined".
  If the engagement is "Received", the author will be emailed and additional fields are available
  to provide more information about the engagement.
  If the engagement is "Declined", the author is emailed.

  Scenario: Administrator user tests the Approval the approval proccess of MATCH plus Engagements
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "edit-field-urgency"
    Then I should see "Description"
    Then I should see "Interested People"
    When I select "Submitted" from "edit-moderation-state-0-state"
    When I wait 3 seconds
    Then I press "op"
    When I click "Edit"
    And I wait for the page to be loaded
    #TODO MAtch engagement after approval section is not available in behat https://cyberteamportal.atlassian.net/browse/D8-1828
    #When I select "Received" from "edit-moderation-state-0-state"

  Scenario: Administrator user tests the Approval the approval proccess of MATCH premier Engagements
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/match_engagement?type=premier"
    Then I should see "Create premier Engagement"
    When I fill in "Project Title" with "Test"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "edit-field-urgency"
    Then I should see "Description"
    Then I should see "Interested People"
    When I select "Submitted" from "edit-moderation-state-0-state"
    When I wait 3 seconds
    Then I press "op"
    When I click "Edit"
    And I wait for the page to be loaded
    #TODO MAtch engagement after approval section is not available in behat https://cyberteamportal.atlassian.net/browse/D8-1828
    #When I select "Received" from "edit-moderation-state-0-state"
