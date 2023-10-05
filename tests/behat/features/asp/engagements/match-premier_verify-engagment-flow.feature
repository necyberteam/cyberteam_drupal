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



  Scenario: Pecan Pie user creates a match-premier engagement
    Given I am logged in with email "pecan@pie.org"
    When I go to "/node/add/match_engagement?type=premier"
    And I wait 1 seconds
    Then I should see "Create Premier Engagement"
    And I wait 2 seconds
    When I fill in "Project Title" with "Testing456"
    When I fill in "Institution" with "Test456"
    Then I should see "Description"
    When I fill the rich textarea "edit-body-wrapper" with "Test456-description"
    Then I should see "Test456-description"

    When I click the element with selector "Select relevant tags"
    When I click the element with selector "access-acount"

    # verify the cannot accept or decline their engagement
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "Submitted"
    Then element "edit-moderation-state-0-state" should not contain "Declined"
    Then element "edit-moderation-state-0-state" should not contain "Received"
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Testing456 has been created."

    # Now change to submitted
    When I follow "Testing456"
    When I follow "Edit"
    # following should be something like http://cyberteam.cnctci.lndo.site/node/5997/edit
    # Then print current URL
    Then I should see "Current state"
    When I select "Submitted" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Testing456 has been updated."
    Then I should see "Thank you for submitting your project"
    Then I should see "In Review"


  Scenario: match_sc user updates the Match Premier engagement to "received"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Testing456"
    When I follow "Edit"
    # following should be something like http://cyberteam.cnctci.lndo.site/node/5997/edit
    #Then print current URL

    # verify new fields appear
    Then I should see "Select relevant tags"
    # TODO select & confirm tags??  could be difficult
    Then I should see "Interested People"
    #Then I should see "Notes to Author"
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
    Then I should see "MATCH+ Engagement Testing456 has been updated."
    Then I should see "received"


  Scenario: match_sc user adds a steering committee member, and updates the status to "In Review"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Testing456"
    When I follow "Edit"

    # Add a milestone & date
    When I fill in "edit-field-milestone-description-0-value" with "Test4564567-Milestone-1"
    When I fill in "edit-field-milestone-completion-date-0-value-date" with "2025-01-01"
    #When I set date of "edit-field-milestone-completion-date-0-value-date" to "2025-01-01"

    # add steering committee member
    Then I should see "MATCH Steering Committee member"
    When I fill in "edit-field-match-steering-committee-m-0-target-id" with "Julie Ma (100)"

    # update to In Review
    When I select "In Review" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Testing456 has been updated."


  Scenario: match_sc user updates the status to "Recruiting"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Testing456"
    When I follow "Edit"

    When I select "Recruiting" from "edit-moderation-state-0-state"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "MATCH+ Engagement Testing456 has been updated."


  Scenario: match_sc user verifies status options of "Recruiting" engagement
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Testing456"
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


  Scenario:  match_sc user can add additional details after their engagement has been "Received"
    Given I am logged in as a user with the "match_sc" role
    When I go to "/match-engagements-submissions"
    When I follow "Testing456"
    When I follow "Edit"
    And I wait 2 seconds
    # following should be something like http://cyberteam.cnctci.lndo.site/node/5997/edit
    #Then print current URL

    Then I should see "Researcher(s)"
    Then I should see "Select the researcher(s) leading this project"
    # Fill in fields that are now available
    When I click the element with selector "Engagement Details"
    Then I should see "HPC Resources Needed (if known)"
    When I fill in "edit-field-hpc-resources-needed-0-value" with "hpc456"
    Then I should see "Select relevant tags"
    Then I should see "Project Image"
    Then I should see "Project Deliverables"
    When I fill in "edit-field-project-deliverables-0-value" with "deliv456"

    When I click the element with selector "Final Report"
    Then I should see "What is the impact on the development discipline(s) of the project?"
    When I fill in "edit-field-what-is-the-impact-on-the-0-value" with "impact456"
    Then I should see "Lessons Learned"
    When I fill in "edit-field-lessons-learned-0-value" with "learn456"
    And I wait 1 seconds
    When I press "Save"
    Then I should see "MATCH+ Engagement Testing456 has been updated."
    When I follow "Edit"

    # Verify fields have expected values
    Then element "edit-field-hpc-resources-needed-0-value" should contain "hpc456"
    Then element "edit-field-project-deliverables-0-value" should contain "deliv456"
    Then element "edit-field-what-is-the-impact-on-the-0-value" should contain "impact456"
    Then element "edit-field-lessons-learned-0-value" should contain "learn456"


  Scenario:  Pecan Pie user can add additional details after their engagement has been "Received"
    Given I am logged in with email "pecan@pie.org"
    When I go to "/community-persona"
    When I follow "Testing456"
    When I follow "Edit"
    And I wait 2 seconds
    # following should be something like http://cyberteam.cnctci.lndo.site/node/5997/edit
    # Then print current URL

    Then value of element "edit-field-match-steering-committee-m-0-target-id" should contain "Julie Ma"
    # id="edit-field-match-steering-committee-m-0-target-id"
    Then "edit-field-match-steering-committee-m-0-target-id" is disabled

    # fill new new fields as original author and save

    When I click the element with selector "Final Report"
    When I fill in "edit-field-what-is-the-impact-on-othe-0-value" with "otherImpact456"
    When I fill in "edit-field-notes-0-value" with "notes456"

    And I wait 1 seconds
    When I press "Save"
    Then I should see "MATCH+ Engagement Testing456 has been updated."
    When I follow "Edit"
    When I click the element with selector "Engagement Details"

    # Verify fields have expected values
    When I click the element with selector "Engagement Details"
    When I click the element with selector "Final Report"
    Then element "edit-field-hpc-resources-needed-0-value" should contain "hpc456"
    Then element "edit-field-project-deliverables-0-value" should contain "deliv456"
    Then element "edit-field-what-is-the-impact-on-the-0-value" should contain "impact456"
    Then element "edit-field-lessons-learned-0-value" should contain "learn456"
    Then element "edit-field-what-is-the-impact-on-othe-0-value" should contain "otherImpact456"
    Then element "edit-field-notes-0-value" should contain "notes456"

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

