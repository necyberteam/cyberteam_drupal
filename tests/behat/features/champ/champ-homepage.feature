@champ
@api
@javascript

Feature: Verify homepage items

  Scenario: Verify the main icon loads
    Given I am not logged in
    When I am on the homepage
    Then I should see an image with alt text "Campus Champions"
    Then I should see "Login"
    Then I should see "Join"
    Then I should see "About Us"
    Then I should see "Find Champions"
    Then I should see "Affinity Groups"
    Then I should see "CI Links"
    Then I should see "Advancing Science"
    Then I should see "Creating Community"
    Then I should see "Building Knowledge"
    Then I should see "Become a Champion"
    Then I should see "Information Sharing"
    Then I should see "Research Community"
    Then I should see "Help with ACCESS allocations"
    Then I should see "Campus Champions provide information on ACCESS and cyberinfrastructure"
    Then I should see "Find other Champions"
    Then I should see "We have an incredible diverse community of research"
    Then I should see "Beyond the all-Champions calls and email list,"
    Then I should see "Join Affinity Groups"
    Then I should see an image with alt text "Join Affinity Groups"

    When I click "Find Champions"
    And I wait 4 seconds
    Then I should be on "/champions/current-campus-champions"

    When I am on the homepage
    And I click "Join Affinity Groups"
    And I wait 4 seconds
    Then I should be on "/affinity-groups"

  Scenario: Unauthenticated user clicks "Join us"
    Given I am not logged in
    When I am on the homepage
    When I click "Join us"
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
    # How would i test this?
    # When I select "Student Champion" from "I am joining as a..."
    Then I should see "Carnegie Classification"
    When I fill in "Carnegie Classification" with "Champ"
    And I wait 10 seconds
    Then I should see "Champlain College"



