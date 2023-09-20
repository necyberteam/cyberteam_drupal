@wip
@api
@javascript

Feature: test ACCESS Support Community Persona


  Scenario: Admin user adds an engagement and it appears on their community persona
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/match_engagement?type=plus"
    And I wait for the page to be loaded
    When I fill in "edit-title-0-value" with "test-admin-created-engagement"
    When I press "Save"
    And I wait 4 seconds
    Then I should see "MATCH+ Engagement test-admin-created-engagement has been created."
    When I go to "/community-persona"
    And I wait 4 seconds
    Then I should see "test-admin-created-engagement"
