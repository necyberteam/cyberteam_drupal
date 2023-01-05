@coco
@api
@javascript

Feature: Test registration page

  Scenario: Verify the Join button links to join
    Given I am not logged in
    When I am on "user/register"
    And I should see "Please select an account type below to create"

    When I follow "Representative"
    Then I should see "Create new representative account"
