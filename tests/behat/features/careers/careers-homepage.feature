@careers
@api
@javascript

Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/careers_cyberteam"
    And I should see "CAREERS Cyberteam"

  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "CAREERS Cyberteam"
    Then I should be on the homepage

  Scenario: Authenticated, User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/careers_cyberteam"
    And I should see "CAREERS Cyberteam"

  Scenario: Authenticated, Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "CAREERS Cyberteam"
    Then I should be on the homepage
