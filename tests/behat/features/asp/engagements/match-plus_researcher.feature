@asp
@api
@javascript

# TODO - complete this.
# see https://cyberteamportal.atlassian.net/browse/D8-1593


Feature: testing match engagements as researcher role

  Scenario: creating engagement as researcher role
    Given I am logged in as a user with the "researcher" role
    When I am on "/matchplus"
    Then I should see "Request a Pilot Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    #TODO: test creating an engagement
    When I fill in "edit-title-0-value" with "Florida Project"
    #When I click the "edit-submit" element

  Scenario: testing editing engagement
    #TODO

  Scenario: steering committee field should be read-only
    #TODO

  Scenario: should not see an option to publish the engagement
    #TODO

  Scenario: should NOT see an option to accept the engagement
    #TODO
