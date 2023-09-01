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


  Scenario: match_sc user tests the approval proccess of MATCH plus Engagements
    Given I am logged in as a user with the "match_sc" role

    When I go to "/node/add/match_engagement?type=plus"

    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test1234567"
    When I select "Submitted" from "edit-moderation-state-0-state"
    Then I press "op"
    Then I should see "Test1234567"
    Then I should see "MATCH+ Engagement Test1234567 has been created."
    Then I should see "A mail has been sent"

    When I follow "Test1234567"
    #Then print current URL

    When I follow "Edit"
    #Then print current URL
    #And I wait 2 seconds

    Then I should see "Current state"
    Then I should see "Change to"

    When I select "Received" from "edit-moderation-state-0-state"
    Then I press "op"
    Then I should see "MATCH+ Engagement Test1234567 has been updated."

    When I follow "Test1234567"
    When I follow "Edit"
    #Then print current URL

    Then I should see "HPC Resources Needed (if known)"
    When I fill in "edit-field-hpc-resources-needed-0-value" with "hpc123"
    Then I should see "Select relevant tags"
    Then I should see "Project Image"
    Then I should see "Project Deliverables"
    When I fill in "edit-field-project-deliverables-0-value" with "deliv123"
    Then I should see "Planned Publications"
    When I fill in "edit-field-planned-publications-0-value" with "plan123"
    Then I should see "Planned Knowledge Base Contribution"
    When I fill in "edit-field-planned-portal-contributio-0-value" with "contrib123"
    Then I should see "Git Contribution"
    When I fill in "edit-field-git-contribution-0-uri" with "https://github.com/necyberteam/cyberteam_drupal"
    Then I should see "What MATCH will learn"
    When I fill in "edit-field-what-match-will-learn-0-value" with "learn123"
    When I should see "Interested People"
    When I fill in "edit-field-match-interested-users-0-target-id" with "Walnut Pie (200)"
    Then I should see "Notes to Author"
    When I fill in "edit-field-notes-to-author-0-value" with "notes123"

    Then I press "op"
    Then I should see "MATCH+ Engagement Test1234567 has been updated."
    When I follow "Edit"

    Then element "edit-field-hpc-resources-needed-0-value" should contain "hpc123"
    Then element "edit-field-project-deliverables-0-value" should contain "deliv123"
    Then element "edit-field-planned-publications-0-value" should contain "plan123"
    Then element "edit-field-planned-portal-contributio-0-value" should contain "contrib123"
    #Then I print value of element with id "edit-field-git-contribution-0-uri"
    Then value of element "edit-field-git-contribution-0-uri" should contain "https://github.com/necyberteam/cyberteam_drupal"
    Then element "edit-field-what-match-will-learn-0-value" should contain "learn123"
    Then value of element "edit-field-match-interested-users-0-target-id" should contain "Walnut Pie (200)"
    Then element "edit-field-notes-to-author-0-value" should contain "notes123"
