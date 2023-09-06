@asp
@api
@javascript

Feature: verify the approval process of a MATCH Engagement
  The flow should be as follows:
  - an authenticated user creates an engagement and saves it as a draft.
  - then they edit their engagement and save it as submitted
  - Then the match_sc user should edit and save as received
  - then the engagement author should then be able to edit and see the additional fields.
  Also
  - The match_sc role should be able to add a user as the Steering Committee
    member to an engagement.
  - The author of the engagement should be able to see this as read-only.


  Scenario: Pecan Pie user creates a match-plus engagement
    Given I am logged in with email "pecan@pie.org"
    When I go to "/node/add/match_engagement?type=plus"
    And I wait 1 seconds
    Then I should see "Create MATCH+ Engagement"
    And I wait 2 seconds
    When I fill in "Project Title" with "Test1234567"
    When I fill in "Institution" with "Test"
    When I select "Start within 3 months" from "edit-field-urgency"
    Then I should see "Description"

    # verify the cannot accept or decline their engagement
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "Submitted"
    Then element "edit-moderation-state-0-state" should not contain "Declined"
    Then element "edit-moderation-state-0-state" should not contain "Received"
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test1234567 has been created."

    # Now change to submitted
    When I follow "Test1234567"
    When I follow "Edit"
    # following should be something like http://cyberteam.lndo.site/node/5997/edit
    # Then print current URL
    Then I should see "Current state"
    When I select "Submitted" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test1234567 has been updated."
    Then I should see "Thank you for submitting your project"
    Then I should see "In Review"


  Scenario: match_sc user updates the engagement to "received"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Test1234567"
    When I follow "Edit"
    # following should be something like http://cyberteam.lndo.site/node/5997/edit
    #Then print current URL

    # verify new fields appear
    Then I should see "Select relevant tags"
    # TODO select & confirm tags??  could be difficult
    Then I should see "Interested People"
    Then I should see "Notes to Author"
    Then I should see "Current state"
    Then I should see "Submitted"

    # verify all status options are available
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "Submitted"
    Then element "edit-moderation-state-0-state" should contain "Declined"
    Then element "edit-moderation-state-0-state" should contain "Received"

    # update to received
    When I select "Received" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test1234567 has been updated."
    Then I should see "received"


  Scenario: match_sc user adds a steering committee member, and updates the status to "In Review"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Test1234567"
    When I follow "Edit"

    # add steering committee member
    Then I should see "MATCH Steering Committee member"
    When I fill in "edit-field-match-steering-committee-m-0-target-id" with "Julie Ma (100)"

    # update to In Review
    When I select "In Review" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test1234567 has been updated."


  Scenario: match_sc user updates the status to "Recruiting"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Test1234567"
    When I follow "Edit"

    When I select "Recruiting" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Test1234567 has been updated."


  Scenario: match_sc user verifies status options of "Recruiting" engagement
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Test1234567"
    When I follow "Edit"

    # verify these status options are available
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "In Review"
    Then element "edit-moderation-state-0-state" should contain "Recruiting"
    Then element "edit-moderation-state-0-state" should contain "Reviewing Applicants"
    Then element "edit-moderation-state-0-state" should contain "In Progress"
    Then element "edit-moderation-state-0-state" should contain "Finishing Up"
    Then element "edit-moderation-state-0-state" should contain "Complete"
    Then element "edit-moderation-state-0-state" should contain "On Hold"
    Then element "edit-moderation-state-0-state" should contain "Halted"
    Then element "edit-moderation-state-0-state" should contain "Declined"


  Scenario:  Pecan Pie user can edit their engagement after it has been marked as Recruiting
    Given I am logged in with email "pecan@pie.org"
    When I go to "/community-persona"
    When I follow "Test1234567"
    When I follow "Edit"
    And I wait 2 seconds
    # following should be something like http://cyberteam.lndo.site/node/5997/edit
    #Then print current URL

    # fill new new fields as original author and save
    Then I should see "Researcher(s)"
    Then I should see "Select the researcher(s) leading this project"
    # Fill in fields that are now available
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
    And I wait 1 seconds
    When I press "Save"
    Then I should see "MATCH+ Engagement Test1234567 has been updated."
    When I follow "Edit"

    # Verify fields have expected values
    Then element "edit-field-hpc-resources-needed-0-value" should contain "hpc123"
    Then element "edit-field-project-deliverables-0-value" should contain "deliv123"
    Then element "edit-field-planned-publications-0-value" should contain "plan123"
    Then element "edit-field-planned-portal-contributio-0-value" should contain "contrib123"
    #Then I print value of element with id "edit-field-git-contribution-0-uri"
    Then value of element "edit-field-git-contribution-0-uri" should contain "https://github.com/necyberteam/cyberteam_drupal"
    Then element "edit-field-what-match-will-learn-0-value" should contain "learn123"

    #Then I display element "edit-field-match-steering-committee-m-0-target-id"
    Then value of element "edit-field-match-steering-committee-m-0-target-id" should contain "Julie Ma"
    Then "edit-field-match-steering-committee-m-0-target-id" is disabled

    # verify expected status options
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "In Review"
    Then element "edit-moderation-state-0-state" should contain "Reviewing Applicants"
    Then element "edit-moderation-state-0-state" should contain "In Progress"
    Then element "edit-moderation-state-0-state" should contain "Finishing Up"
    Then element "edit-moderation-state-0-state" should contain "Complete"
    Then element "edit-moderation-state-0-state" should contain "On Hold"
    Then element "edit-moderation-state-0-state" should contain "Halted"
    Then element "edit-moderation-state-0-state" should not contain "Declined"
    Then element "edit-moderation-state-0-state" should not contain "Received"
    Then element "edit-moderation-state-0-state" should not contain "Accepted"
