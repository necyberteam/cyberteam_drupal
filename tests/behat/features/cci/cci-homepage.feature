@cci
@api
@javascript

Feature: verify specific links on homepage

  # TODO - currently broken
  #Scenario: User is on the homepage
  #  Given I am not logged in
  #  When I am on the homepage
  #  When I follow "Contact Us"
  #  Then I should be on "contact/careers_cyberteam"
  #  And I should see "CAREERS Cyberteam"
    
  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "Connect CI" 
    Then I should be on the homepage
    
  # TODO - currently broken
  #Scenario: Authenticated User is on the homepage
  #  Given I am logged in as a user with the "authenticated" role
  #  When I am on the homepage
  #  When I follow "Contact Us"
  #  Then I should be on "contact/careers_cyberteam"
  #  And I should see "CAREERS Cyberteam"
    
  Scenario: Authenticated Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Connect CI" 
    Then I should be on the homepage
    