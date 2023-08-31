@wip
@api
@javascript

# TODO - complete this.
# see https://cyberteamportal.atlassian.net/browse/D8-1593


Feature: testing match engagements

  Scenario: creating engagement as administrator role
    Given I am logged in as a user with the "administrator" role
    When I am on "/matchplus"
    Then I should see "Request a Pilot Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefg111"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "Urgency"
    #Description is not easily accessible via behat, not critical for testing
    #When I fill in "edit-body-wrapper" with "Test"
    When I press "Save"
    Then I should see "Test match_engagement abcdefg111"

  Scenario: creating engagement as authenticated role
    Given I am logged in as a user with the "authenticated" role
    When I am on "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefg333"
    #When I fill in "edit-body-wrapper" with "Test"
    When I press "Save"
    #Then I should see "Test match_engagement abcdefg333"

  Scenario: creating engagement as researcher role
    Given I am logged in as a user with the "researcher" role
    When I am on "/matchplus"
    Then I should see "Request a Pilot Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefg222"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "Urgency"
    #Description is not easily accessible via behat, not critical for testing
    #When I fill in "edit-body-wrapper" with "Test"
    When I press "Save"
    # TODO researcher role failing, not sure why
    # Then I should see "Test match_engagement abcdefg222"

  Scenario: testing editing engagement
    #TODO

  Scenario: steering committee field should be read-only
    #TODO

  Scenario: should not see an option to publish the engagement
    #TODO

  Scenario: should NOT see an option to accept the engagement
    #TODO
