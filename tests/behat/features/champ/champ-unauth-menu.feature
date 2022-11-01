@champ
@api
Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see "Log In"
    Then I should see "Join CC"
    Then I should not see "My Profile"
    Then I should see "About Us"
    Then I should see "Champions"
    Then I should see "Community"
    Then I should see "Get Help"
    Then I should see "Tags"
    When I click "Join CC"
    Then I should see "Join Campus Champions"
    Then I should see "Letter of Collaboration"
    Then I should see "Username"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Email"
    Then I should see "I am joining as a..."
    Then I should see "Carnegie Classification"
    When I fill in "Carnegie Classification" with "Champ"
    And I wait 10 seconds
    Then I should see "Champlain College"

