@ky
@api
@javascript

Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/kentucky_cyberteam"
    And I should see "Kentucky Cyberteam"

  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "Kentucky Cyberteam" 
    Then I should be on the homepage

  Scenario: Authenticated user is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/kentucky_cyberteam"
    And I should see "Kentucky Cyberteam"
    
  Scenario: Authenticated, Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Kentucky Cyberteam" 
    Then I should be on the homepage
    
        