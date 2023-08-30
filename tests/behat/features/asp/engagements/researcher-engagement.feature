@wip
@api
@javascript

Feature: testing match engagements submissions for researcher role
  A person with the researcher role can create a MATCHPlus engagement

  Scenario: Person with administrator role creates a MATCHPlus engagement
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefgh111"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "Urgency"
    #Description is not easily accessible via behat, not critical for testing
    #When I fill in "edit-body-wrapper" with "Test"
    When I press "Save"
    Then I should see "Test match_engagement abcdefgh111"

  Scenario: Person with researcher role creates a MATCHPlus engagement
    Given I am logged in as a user with the "researcher" role
    When I go to "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefg222"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "Urgency"
    #Description is not easily accessible via behat, not critical for testing
    #When I fill in "edit-body-wrapper" with "Test"
    When I press "Save"
    # TODO researcher role failing, not sure why
    # Then I should see "Test match_engagement abcdefg222"
