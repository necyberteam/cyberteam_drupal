@asp
@api
@javascript

Feature: MATCH Interested Users page
  MATCH Engagements in recruiting state have an "I'm interested" button. 
  An authenticated user clicking the button is adding to a table on the 
  the MATCH Interested Users page listing interested users.
  An authenticated "interested" user can click a button to indicate they 
  are no longer interested.
  TODO: This page should be viewable by match_pm and match_sc roles but not authenticated
  Displaying:
  - Link to edit
  - TODO: Status
  - Title with link to view
  - TODO: Team with links to community persona for researcher(s), student(s), mentor(s), and consultant
  Submissions on the Interested Users page can be filtered by status.

  Scenario: Pecan Pie User tests the Interested button on a recruiting engagment
    Given I am logged in with email "pecan@pie.org"
    When I go to "/engagements"
    When I follow "Test1234567"
    #When I go to "/node/6011"
    Then I should see "recruiting"
    When I click "I'm Interested"
    And I wait 3 seconds
    Then I should see "You have been added to the interested list"
    When I click "I'm no longer Interested"
    And I wait 3 seconds
    Then I should see "You have been removed from the interested list"
    When I click "I'm Interested"
    And I wait 3 seconds
    Then I should see "You have been added to the interested list"

  Scenario: administrator user tests the MATCH Interested Users Page
    Given I am logged in as a user with the "administrator" role
    When I go to "/match-interested-users"
    Then I should see "match interested users"
    Then I should see "Title"
    Then I should see "Interested Users"
    Then I should see "Node ID"
    Then I should see "Roles"
    When I fill in "Title" with "Test1234567"
    #roles_target_id is Roles
    When I select "CCMNet PM" from "roles_target_id"
    #edit-submit-match-interested-users is the APPLY button
    When I press "edit-submit-match-interested-users"
    And I wait 3 seconds
    When I click "Test1234567"
    And I wait for the page to be loaded
    Then I should see "Test1234567"