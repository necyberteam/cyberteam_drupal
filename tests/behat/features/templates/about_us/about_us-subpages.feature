@templates
@api
@javascript

Feature: verify the /about-us subpages as anonymous & authenticated user

  Scenario: unauthenticated user test About Us menu subpages
    Given I am not logged in
    When I am on "about-us/user-guide"
    Then I should see "Welcome to the Cyberteam Portal Users Guide!"

  Scenario: authenticated user tests About Us menu subpages
    Given I am logged in with the "authenticated" role
    When I am on "about-us/user-guide"
    Then I should see "Welcome to the Cyberteam Portal Users Guide!"
