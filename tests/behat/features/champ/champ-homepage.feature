@champ
@api
@javascript

Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/campus_champions"
    And I should see "Campus Champions"
    
  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "Campus Champions" 
    Then I should be on the homepage

  Scenario: authenticated User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/campus_champions"
    And I should see "Campus Champions"
    
  Scenario: authenticated Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Campus Champions" 
    Then I should be on the homepage
    
    