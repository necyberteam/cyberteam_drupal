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
    Then I should see "Program"
    Then I should see "Email address"
    Then I should see "Username"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Institution"
    # Not current displaying "Current Degree Program"
    # Then I should see "Current Degree Program"
    Then I should see "HPC Experience"
    Then I should see "CV/Resume"
    Then I should see "Time Zone"
    Then I should see "Citizenships"

    When I am on "user/register"
    When I follow "Mentor"
    Then I should see "Create new mentor account"
    Then I should see "Program"
    Then I should see "Email address"
    Then I should see "Username"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Institution"
    # Not currently displaying these options
    # Then I should see "Degree"
    # Then I should see "Current Occupation"
    Then I should see "CV/Resume"
    Then I should see "Time Zone"
    Then I should see "Citizenships"

    When I am on "user/register"
    When I follow "Researcher/Educator"
    Then I should see "Create new researcher/educator account"
    When I select "At-Large" from "Program"
    When I fill in "edit-mail" with "Test@mail.com"
    When I fill in "edit-name" with "Test"
    When I fill in "edit-field-user-first-name-0-value" with "Test"
    When I fill in "edit-field-user-last-name-0-value" with "Test"
    When I fill in "edit-field-institution-0-value" with "Test"
    # Not currently using the degree field
    # When I fill in "edit-field-degree-0-value" with "Test"
    # When I fill in "edit-field-current-occupation-0-value" with "Test"
    When I fill in "edit-field-citizenships-0-value" with "Test"
    When I click "op"
    #TODO Does not go to Homepage goes to /people/card
    #Then I should be on the homepage
