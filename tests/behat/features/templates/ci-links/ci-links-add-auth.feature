@templates
@api
@javascript

Feature: On the Add New CI Links Page for authenticated users,
the form includes fields for Resource Title, Category (dropdown),
Tags (checkboxes with helper text), Skill Level (checkboxes),
Description, and repeatable/reorderable sections for Link to
Resource with Link Title and Link URL (must include https).

  Scenario: Authenticated user fills out the resource form
    Given I am logged in as a user with the "authenticated" role
    When I go to "/ci-links"
    When I follow "Add new CI link"
    Then I should be on "form/ci-link"
    And I should see "Title"
    And I should see "Category"
    And I should see "Tags"
    And I should see "Select one (or more) tags that apply."
    And I should see "Skill Level"
    And I should see "Description"
    And I should see "Link to CI Link"
    And I should see "Link Title"
    And I should see "Link URL"
    And I should see "Add"
    When I fill in "title" with "TEST"
    When I select "learning" from "category"
    When I check "edit-tags-682"
    When I check "Beginner"
    When I fill in "Description" with "Test"
    When I fill in "Link Title" with "Test"
    When I fill in "Link URL" with "http://example.com"
    When I press "Submit"
    Then I should see "TEST"
    And I should see "Submission information"
    And I should see "View"
    And I should see "Edit"
    And I should see "Title"
    And I should see "Category"
    And I should see "Tags"
    And I should see "Skill Level"
    And I should see "Description"
    And I should see "Link to CI Link"
    #TODO: Doesnt always work, investigate
    When I press "Submission information"
    #Then I should see "Submission Number"
    #And I should see "Submission ID"
    #And I should see "Submission UUID"
    #And I should see "Submission URI"
    #And I should see "Created"
    #And I should see "Completed"
    #And I should see "Changed"
    #And I should see "Remote IP address"
    #And I should see "Submitted by"
    #And I should see "Language"
    #And I should see "Is draft"
    #And I should see "Webform"
    #And I should see "Delete submission"
    When I click "Edit"
