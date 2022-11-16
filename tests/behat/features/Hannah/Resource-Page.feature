@careers--
@api
@javascript
Feature: test recources page 
  In order to test the resources page



  Scenario: Unauthenticated user Test the resource page
    Given I am not logged in
    When I go to "/resources"
    Then I should see "Add New Resource"
    Then I should see "These resources have been crowd-sourced"
    Then I should see "Votes"
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    Then I should see "Affinity Group"
    When I fill in "edit-search--2" with "NotAResource"
    And I wait 4 seconds
    Then I should see "There are no resources at this time"
    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    Then I should see "test"