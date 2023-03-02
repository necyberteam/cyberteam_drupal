@champ
@api
@javascript

Feature: verify specific links on homepage
#What file should I attatch?
#I am joining as a... Issue
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
    When I fill in "Username" with "test"
    Then I should see "First Name"
    When I fill in "First Name" with "test"
    Then I should see "Last Name"
    When I fill in "Last Name" with "test"
    Then I should see "Email"
    When I fill in "Email" with "test@email.com"
    Then I should see "I am joining as a..."
    #How would i test this?
   # When I select "Student Champion" from "I am joining as a..."
    Then I should see "Carnegie Classification"
    When I fill in "Carnegie Classification" with "Champ"
    And I wait 10 seconds
    #TODO Options show up but behat is not able to see it.
    #When I select "Champlain College" from "Carnegie Classification"
    #When I click "submit"


