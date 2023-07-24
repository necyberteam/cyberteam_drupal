@templates
@api
@javascript

Feature: test tags page
  Tests for the Tags page

    Scenario: Tags pages for unauthenticated user
      Given I am not logged in
      When I go to "tags"
      Then I should see "Tags"
      And I should see "Contains any word"
      And I should see "Search"
      And I should see "Tree View"
      And I should see "login"
      And I should see "osg"
      And I should see "ACCESS RPs"
      And I should see "xsede"

    Scenario: Tags pages does not show "Request Tag" when logged out
      Given I am not logged in
      When I go to "tags"
      Then I should not see "Request Tag"

    Scenario: Unauthenticated user searches for tags (case insensitive)
      Given I am not logged in
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

    Scenario: Unauthenticated user examines tree view and list view of tags
      Given I am not logged in
      When I go to "/tags"
      When I follow "Tree View"
      Then I should see "Please select the"
      And I should be on "tags/hierarchal"
      When I click "ACCESS RPs"
    # want to test clicking the down arrow - following isn't right
      #Then I should see "access-acount"
      When I go to "tags/hierarchal"
      When I follow "List View"
      Then I should be on "/tags"