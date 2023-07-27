@wip
@api
@javascript

Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I follow "Connect.CI"
    And I wait 4 seconds
    # TODO - next lines fails with 'Current page is "/", but "/regions" expected.' - https://cyberteamportal.atlassian.net/browse/D8-1775
    #Then I should be on "/regions"
    And I should see "Connect.Cybinfrastructure is a family of portals, each representing a program"

  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "Campus Champions"
    Then I should be on the homepage

  Scenario: authenticated User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Connect.CI"
    And I wait 4 seconds
    # TODO - next lines fails with 'Current page is "/", but "/regions" expected.' - https://cyberteamportal.atlassian.net/browse/D8-1775
    #Then I should be on "/regions"
    And I should see "Connect.Cybinfrastructure is a family of portals, each representing a program"


  Scenario: authenticated Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Campus Champions"
    Then I should be on the homepage

