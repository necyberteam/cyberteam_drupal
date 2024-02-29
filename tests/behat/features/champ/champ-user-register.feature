@champ
@api
@javascript

Feature: Test registration page

  Scenario: Verify the Join button links to join
    Given I am not logged in
    When I am on "user/register"
    And I should see "Please select an account type below to create"

    When I follow "Research Computing Facilitator"
    Then I should see "Create new research computing facilitator account"

    When I am on "user/register"
    When I follow "Research Software Engineer"
    Then I should see "Create new research software engineer account"

    When I am on "user/register"
    When I follow "Cyberinfrastructure Systems Engineer"
    Then I should see "Create new ci systems engineer account"

    When I am on "user/register"
    When I follow "Student Champion"
    Then I should see "Create new student champion account"

    When I am on "user/register"
    When I follow "Domain Champion"
    Then I should see "Create new domain champion account"

    When I am on "user/register"
    When I follow "Representative"
    Then I should see "Create new representative account"
