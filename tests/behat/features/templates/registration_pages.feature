@templates
@api
@javascript

Feature: Test registration page

  Scenario: Verify the Join button links to join
    Given I am not logged in
    When I am on the homepage
    When I click "Join"
    Then I should be on "user/register"
    And I should see "Please select an account type below to create"

    When I follow "Student Facilitator"
    Then I should see "Create new student-facilitator account"

    When I am on "user/register"
    When I follow "Mentor"
    Then I should see "Create new mentor account"

    When I am on "user/register"
    When I follow "Researcher/Educator"
    Then I should see "Create new researcher/educator account"
