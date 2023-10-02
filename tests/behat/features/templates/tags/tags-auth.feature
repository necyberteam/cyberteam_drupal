@templates
@api
@javascript

Feature: This test is as an authenticated user.
"Tree View" redirects to the hierarchical tags view page.
It presents all published tags in a hierarchical tree structure.
Each tag links to its respective tag page.
Clicking the ">" arrow on a branch tag reveals its child tags.
Clicking the down arrow on a branch tag hides its child tags.
The "Tree View" button is grayed out.

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
    And I should be on "/tags/hierarchal"
    When I follow "List View"
    Then I should see "login"
    Then I should be on "/tags"
    When I select "Contains all words" from "edit-name-op--2"
