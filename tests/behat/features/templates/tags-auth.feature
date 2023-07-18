@templates
@api
@javascript

Feature: test tags page for authenticated user

  Scenario: Tags pages for authenticated user
    Given I am logged in as a user with the "authenticated" role
    When I go to "tags"
    Then I should see "Tags"
    And I should see "Contains any word"
    And I should see "Search"
    And I should see "Tree View"
    And I should see "login"
    And I should see "osg"
    And I should see "ACCESS RPs"
    And I should see "xsede"

  Scenario: Tags pages shows "Request Tag" for authenticated user
    Given I am logged in as a user with the "authenticated" role
    When I go to "tags"
    Then I should see "Request Tag"

  Scenario: Authenticated user searches for tags (case insensitive)
    Given I am logged in as a user with the "authenticated" role
    When I go to "tags"
    When I fill in "Search" with "login"
    Then I should see "login"
    When I fill in "Search" with "LOGIN"
    Then I should see "login"
    When I fill in "Search" with "LOGIN"
    Then I should see "login"
    When I follow "login"
    Then I should be on "tags/login"
    And I should see "Blog Entries"

  Scenario: Authenticated user examines tree view of tags
    Given I am logged in as a user with the "authenticated" role
    When I go to "tags"
    When I follow "Tree View"
    Then I should see "Please select the"
    When I click "ACCESS RPs"
    # want to test clicking the down arrow - following isn't right
    #And I wait 5 seconds
    #Then I should see "DNS"
    And I should be on "/tags/access-rps"
    When I go to "/tags/hierarchal"
    When I follow "List View"
    Then I should see "login"
    Then I should be on "/tags"
    When I select "Contains all words" from "edit-name-op--2"
