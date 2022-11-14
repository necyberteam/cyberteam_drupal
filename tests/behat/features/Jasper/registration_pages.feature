@wip-
@api
@javascript

Feature: Test registration page

  Scenario: Verify the Join button links to join 
    Given I am not logged in
    When I am on the homepage
    When I click "Join" 
    Then I should be on "user/register"
    And I should see "Please select an account type below to create"

    #When I click on "Student 
    