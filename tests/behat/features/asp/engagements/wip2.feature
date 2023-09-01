@wip
@api
@javascript

Feature: test the approval proccess of MATCH Engagements
  MATCH engagements can be created by match_sc people.
  TODO: Fields include: Title, Institution, Urgency, Description, Tags
  TODO: The engagement can be saved as a "Draft" or "Submitted" for review.
  TODO: When the engagement is submitted, match_sc receives email.
  TODO: match_sc role can save as "Received", "Draft", or "Declined".
  If the engagement is "Received", the author will be emailed and additional fields are available
  to provide more information about the engagement.
  If the engagement is "Declined", the author is emailed.

  In the first scenario, a match_sc user creates a "submitted" engagement,
  then updates it to "received", fills in additional fields, saves it again,
  then the test verifies those fields have expected values.


  Background:
    Given users:
      | name   | mail         |
      | _bob   | _bob@foo.com |
      | _boss  | _bos@foo.com |
    And I am logged in as "_bob"
    And the test email system is enabled

  Scenario: match_sc user tests the approval proccess of MATCH plus Engagements
    Given I am logged in as a user with the "match_sc" role

    When I go to "/node/add/match_engagement?type=plus"

    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test1234567"
    When I select "Submitted" from "edit-moderation-state-0-state"
    Then I press "op"
    Then the email to "_bob@foo.com" should contain " New Match+ Node Created"

    #And I wait 2 seconds
    #Then I should see "Test1234567"
    #Then I should see "MATCH+ Engagement Test1234567 has been created."
    #Then I should see "A mail has been sent"
