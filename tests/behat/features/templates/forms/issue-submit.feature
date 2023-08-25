@templates
@api
@javascript

Feature: For an authenticated or admin user, the "form/issue" page offers
  a form featuring fields like Title, Region, Category, Expert
  Category (on CAREERS), Priority, and Tags. Users can provide
  Details and upload Files. After submission, an email notification
  is sent to the NECT mailing list, and the ticket becomes visible
  in the Help Desk, where only administrators can view and edit it.

  Scenario: Authenticated user fills out the enter ticket form
    Given I am logged in as a user with the "authenticated" role
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
    When I check "login"
    When I fill in "details" with "TEST"
    When I press "Submit"
    Then I should see "Thank you! Your ticket has been submitted! We'll be in touch soon."

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
    When I select "Active" from "edit-status-select"
    When I fill in "details" with "TEST"
    When I press "Submit"
    Then I should see "Thank you! Your ticket has been submitted! We'll be in touch soon."

