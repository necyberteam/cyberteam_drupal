@wip--
@api

Feature: add an affinity group form
  To test adding an affinity group
  As admin
  I can add a test affinity group

  Scenario: Add a "test-affinity-group" for "login" tag and verify it appears
    Given I am logged in as a user with the "administrator" role
    When I go to "node/add/affinity_group"
    When I fill in "Title" with "test-affinity-group"
    # resource is ACCESS-support
    When I select "618" from "edit-field-affinity-group"
    # tag is "login"
    When I select "682" from "edit-field-tags"
    When I check "Published" 
    When I press "Save" 
    Then I should see "has been created"