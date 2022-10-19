@templates
@api
Feature: test enter ticket form
  In order to test the enter ticket form
  As a user of the authenticated role

  # TODO -- rework this for authenticated
  Scenario: Administrator user fills out the enter ticket form
    Given I am logged in as a user with the "administrator" role
    When I go to "form/issue"
    Then I should see "Issue"
    Then I should see "Ticket Data"
    And I should see "Title"
    And I should see "Region"
    And I should see "Category"
    And I should see "Priority"
    And I should see "Status"
    And I should see "Tags"
    And I should see "Select one (or more) tags that apply."
    Then I should see "Issue Summary"
    And I should see "Details"
    And I should see "Files"
    When I fill in "title" with "TEST"
    When I select "At-Large" from "region"
    When I select "Bug report" from "category"
    When I select "Critical" from "priority"
    # When I select "Active" from "edit-status-select"
    When I fill in "details" with "TEST"
    When I press "Submit"
    # Then I should see "Thank you! Your ticket has been submitted! We'll be in touch soon." 