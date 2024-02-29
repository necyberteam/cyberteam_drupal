@coco
@api
@javascript

Feature: Test registration page
  TODO: ensure this verifies the following:
    Join link in header takes user to “Create new representative account” form
    Creating an account returns user to home page with “A welcome message with further instructions has been sent to your email address”

  Scenario: Verify the Join button links to join
    Given I am not logged in
    When I am on "user/register"
    And I should see "Please select an account type below to create"

    When I follow "Representative"
    Then I should see "Create new representative account"
