@asp
@api
@javascript

Feature: testing the ACCESS Support domain masquerading as researcher role

  Scenario: masqueraded as researcher role on ACCESS Support domain
    Given I am logged in as a user with the "researcher" role
    When I am on "matchplus"
    Then I should see "Request a Pilot Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    #TODO: test creating an engagement
    When I fill in "edit-title-0-value" with "Florida Project"
    #When I click the "edit-submit" element

    #TODO: testing editing engagement
    #TODO: steering committee field should be read-only
    #TODO: should not see an option to publish the engagement
    #TODO: should NOT see an option to accept the engagement





