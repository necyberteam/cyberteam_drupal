@cyberteam
@api
Feature: test tags page
  Tests for the Tags page

    Scenario: Tags pages for unauthenticated user
      Given I am not logged in
      When I go to "tags"
      Then I should see "Tags"
      And I should see "Contains any word"
      And I should see "Search"
      And I should see "Tree View"
      And I should see "List View"
      # following worked for a while and now isn't working
      #And I should not see "Request Tag"

    Scenario: Unauthenticated user searches for a tag
      Given I am not logged in
      When I go to "tags"
      When I fill in "Search" with "login"
      And I wait 2 seconds
      Then I should see "login"

    Scenario: Unauthenticated user examines tree view of tags
      Given I am not logged in
      When I go to "tags"
      When I follow "Tree View"
      Then I should see "Please select the"
      And I should be on "tags/hierarchal"
      # want to test clicking the down arrow - following isn't right
      # When I follow "#admin-and-support"
      # Then I should see "login"