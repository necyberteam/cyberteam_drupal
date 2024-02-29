@templates
@api
@javascript

Feature: Verify /help-desk as anonymous, authenticated and admin user

  Scenario: Verify essential features on code of conduct page
    Given I am not logged in
    When I go to "/help-desk"
    Then I should get a "200" HTTP response
    Then I should be on "user/login?destination=/help-desk"
    And I should see "You must log in to view this page."

  Scenario: Verify essential features on code of conduct page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/help-desk"
    Then I should get a "403" HTTP response
    And I should see "You are not authorized to access this page."

  Scenario: Admin makes sure Help Desk Page has all major features
    Given I am logged in as a user with the "administrator" role
    When I go to "/help-desk"
    Then I should see "Help Desk"
    #Below lines are commented out since not all domains have tickets
    # TODO -- make domain specific versions of this test?
    #Then I should see "There are currently no open tickets."
    Then I should see "At-Large"
    Then I should see "All Regions"
    #Then I should see "Title"
    #Then I should see "Region"
    #Then I should see "Category"
    #Then I should see "Priority"
    #Then I should see "Details"
    #Then I should see "Assigned"
    #Then I should see "Status"
    #Then I should see "View"
    #Then I should see "Tags"
