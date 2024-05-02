@templates
@api
@javascript

Feature: test KB Resources form
  In order to test the KB Resources form
  As a user of the administrator role

  Scenario: Administrator user fills out the KB Resources form
    Given I am logged in as a user with the "administrator" role
    # Clear Search api index
    When I go to "/admin/config/search/search-api/index/ci_links"
    When I click the "#edit-clear" element
    When I click the "#edit-submit" element

    When I go to "/knowledge-base/resources"
    When I follow "Add a Resource"
    Then I should be on "/form/resource"
    And I should see "Title"
    And I should see "Category"
    And I should see "Tags"
    And I should see "Select one (or more) tags that apply."
    And I should see "Skill Level"
    And I should see "Description"
    And I should see "Link to Resource"
    And I should see "Link Title"
    And I should see "Link URL"
    And I should see "Add"
    When I fill in "title" with "Test CI Link Title"
    When I select "learning" from "category"
    When I check "Approved"
    # login tag
    When I check "edit-tags-682"
    When I check "Beginner"
    When I fill in "Description" with "Test"
    When I fill in "Link Title" with "Test"
    When I fill in "Link URL" with "http://example.com"
    When I press "Submit"
    Then I should see "Test CI Link Title"
    And I should see "Submission information"
    And I should see "View"
    And I should see "Edit"
    And I should see "Title"
    And I should see "Category"
    And I should see "Tags"
    And I should see "Skill Level"
    And I should see "Description"
    And I should see "Link to Resource"
    #TODO: Doesnt always work, investigate
    When I press "Submission information"
    Then I should see "Submission Number"
    And I should see "Submission ID"
    And I should see "Submission UUID"
    And I should see "Submission URI"
    And I should see "Created"
    And I should see "Completed"
    And I should see "Changed"
    And I should see "Remote IP address"
    And I should see "Submitted by"
    And I should see "Language"
    And I should see "Is draft"
    And I should see "Webform"
    And I should see "Delete submission"
    When I click "Edit"
    Then I should get a "200" HTTP response

  Scenario: Administrator creates a simple ci-link
    Given I am logged in as a user with the "administrator" role
    When I go to homepage
    When I go to "/knowledge-base/resources"
    When I follow "Add a Resource"
    Then I should be on "form/resource"
    Then I should see "Add"
    When I fill in "title" with "test-login-resource"
    When I select "learning" from "category"
    When I check "Approved"
    When I check "login"
    When I press "Submit"
    Then I should see "test-login-resource"
