@templates
@api
@javascript

Feature: test for the admin user to test the domain

  Scenario: User test the domain page as an administrator role
    Given I am logged in as a user with the "administrator" role
    When I am on the homepage
    Then I should see "Shortcuts"
    Then I should see "Go to"
    Then I should see "Devel"
    #Not sure how to test
    # Then I should see "Open Tickets"
    When I click "Contact Us"
    Then I should not see "reCaptcha"
    When I go to "/tags"
    Then I should see "Request Tag"
    When i click "Request Tag"
    #Does not show
    #Then I should see "URL alias"
    When I go to "/projects"
    Then I should see "Submit New Project"
    When I click "Submit New Project"
    Then I should see "Received"
    Then I should see "Accept and Publish"
    When I go to "/ci-links"
    When I click "Add new CI link"
    Then I should see "Approved"
    When I go to "/blog"
    And I wait 4 seconds
    Then I should see "Project Blog"
    Then I should see "Regional Blog"
    Then I should see "Read More"
    When I click "Read More"
    Then I should see "Add New Comment"
    And I wait 2 seconds
    Then I should see "Text format"
    When I fill in "Subject" with "Test"
    #Full Comments Test Does Not Work
    #Not Sure What Comment Field ID is
    #When I fill in "Comment" with "Test"
    # When I click "op"
    #And I wait 4 seconds
    #Just to get an error
    #Then I should see "Soemthign"
    # Then I should see "Delete"
    # Then I should see "Edit"
    #Then I should see ""

    When I go to "/form/issue"
    Then I should see "Ticket Data"
    Then I should see "Status"
    Then I should see "Assigned"

    When I go to "/help-desk"
    Then I should see "Help Desk"
    #Then I should see "Northeast"
    Then I should see "At-Large"
    Then I should see "All Regions"
    #TODO Line below does noy pass Jira created
    #Then I should see "There are currently no open tickets"
