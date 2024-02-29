@gpc
@api
@javascript

Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/great_plains_cyberteam"
    And I should see "Great Plains Cyberteam"

  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "Great Plains Cyberteam" 
    Then I should be on the homepage

  Scenario: authenticated User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/great_plains_cyberteam"
    And I should see "Great Plains Cyberteam"

  Scenario: authenticated Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Great Plains Cyberteam" 
    Then I should be on the homepage
    
    
    