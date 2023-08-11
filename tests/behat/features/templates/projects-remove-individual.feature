@wip--
@api
@javascript

Feature: test removing all projects submissions

  Scenario: Remove all projects and verify empty messages
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/structure/webform/manage/project/results/submissions"
    # TODO - following doesn't work - jira note: https://cyberteamportal.atlassian.net/browse/D8-1628
    When I check "Select all rows in this table"
    When I select "Delete submission" from "edit-action"
    When I press "Apply to selected items"
    #Then I should see "Delete these submissions"
    Then I should see "There are no submissions yet."
