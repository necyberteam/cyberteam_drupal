@templates
@api
@javascript

Feature: test footer

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see "Funded in part by the National Science Foundation"
    And I should see "Copyright"
    And I should see "All Rights Reserved"
    And I should see "Connect.CI"
    And I should see "Contact Us"
    When I follow "Connect.CI"
    Then I should be on "regions"
    
  Scenario: User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should see "Funded in part by the National Science Foundation"
    And I should see "Copyright"
    And I should see "All Rights Reserved"
    And I should see "Connect.CI"
    And I should see "Contact Us"
    When I follow "Connect.CI"
    Then I should be on "regions"
    