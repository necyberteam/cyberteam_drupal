@wip--
@api

Feature: test individual tags page
  To test an individual tag
  While either authenticated or not
  I can verify tag components appear as expected
    
  Scenario: Add a "test-affinity-group" for login tag and verify it appears
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
        
    # works
    Given I am not logged in    
    # TODO does not work
    # Given I am logged in as a user with the "authenticated" role
    # TODO does not work
    # Given I am logged in as a user with the "administrator" role
    When I go to "tags/login"
    Then I should see "test-affinity-group"
    When I follow "test-affinity-group"
    Then I should see "Members get updates about news, events, and outages"
    And I should see "test-affinity-group"