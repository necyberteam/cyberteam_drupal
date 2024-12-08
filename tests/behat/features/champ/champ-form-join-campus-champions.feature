@champ
@api
@javascript

Feature: Test registration page for becoming a campus champion

  Scenario: test the proccess of submitting a form to become a student campus champion
    Given I am not logged in
    When I am on "/form/join-campus-champions"
    Then I should see "Join Campus Champions"
    Then I should see "To Join the Campus Champions, we need a letter of collaboration"
    Then I should see "Letter of Collaboration"
    When I fill in "username" with "Test"
    When I fill in "user_first_name" with "Test"
    When I fill in "user_last_name" with "Test"
    When I fill in "user_email" with "Test"
    When I fill in "carnegie_classification" with "167394"
    When I wait 1 seconds
    When I press "edit-submit"
    When I wait 3 seconds


  Scenario: test the proccess of submitting a form to become a non-student campus champion
    Given I am not logged in
    When I am on "/form/join-campus-champions"
    Then I should see "Join Campus Champions"
    Then I should see "To Join the Campus Champions, we need a letter of collaboration"
    Then I should see "Letter of Collaboration"
    When I fill in "username" with "Test"
    When I fill in "user_first_name" with "Test"
    When I fill in "user_last_name" with "Test"
    When I fill in "user_email" with "Test"
    When I fill in "carnegie_classification" with "167394"
    When I wait 1 seconds
    When I press "edit-submit"
    When I wait 3 seconds
    # Then I should see ______

