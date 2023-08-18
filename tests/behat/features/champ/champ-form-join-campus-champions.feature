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
    # TODO is there a way to upload a file for the Letter of Collaboration?
    When I fill in "username" with "Test"
    When I fill in "user_first_name" with "Test"
    When I fill in "user_last_name" with "Test"
    When I fill in "user_email" with "Test"
    # TODO can't figure out how to press the radio button
    #When I select "edit-champion-user-type-user-student" from "champion_user_type"
    #And I wait 1 seconds
    #Then I should see "Student Champion"
    #When I select "edit-degree-type-user-undergraduate" from "degree_type"
    #And I wait 2 seconds
    #When I fill in "edit-graduation-year" with "2023"
    #When I fill in "study_field" with "Test"
    #When I fill in "edit-mentor-name" with "Test"
    #When I fill in "edit-mentor-email" with "Test"
    When I fill in "carnegie_classification" with "167394"
    When I wait 1 seconds
    When I press "edit-submit"
    When I wait 3 seconds
    # Then I should see ______


  Scenario: test the proccess of submitting a form to become a non-student campus champion
    Given I am not logged in
    When I am on "/form/join-campus-champions"
    Then I should see "Join Campus Champions"
    Then I should see "To Join the Campus Champions, we need a letter of collaboration"
    Then I should see "Letter of Collaboration"
    # TODO is there a way to upload a file for the Letter of Collaboration?
    When I fill in "username" with "Test"
    When I fill in "user_first_name" with "Test"
    When I fill in "user_last_name" with "Test"
    When I fill in "user_email" with "Test"
    # TODO can't figure out how to press the radio button
    #When I select "edit-champion-user-type-user-student" from "champion_user_type"
    #And I wait 1 seconds
    #Then I should see "Champion"
    #When I select "edit-degree-type-user-undergraduate" from "degree_type"
    #And I wait 2 seconds
    #When I fill in "edit-graduation-year" with "2023"
    #When I fill in "study_field" with "Test"
    #When I fill in "edit-supervisor-name" with "Test"
    #When I fill in "edit-supervisor-email" with "Test"
    When I fill in "carnegie_classification" with "167394"
    When I wait 1 seconds
    When I press "edit-submit"
    When I wait 3 seconds
    # Then I should see ______

