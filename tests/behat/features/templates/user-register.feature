@templates
@api
@javascript

Feature: This Behat test covers the Register Page, where three icons are present:

The student-facilitator icon redirects to the student-facilitator registration page.
The mentor icon redirects to the mentor registration page.
The researcher icon redirects to the researcher/educator registration page.
The Student, Mentor, and Researcher Registration Pages have common form fields,
including Email address (unique), Username (unique), First Name, Last Name, Region
(multi-select), and Institution. Each registration type also has additional specific form fields:

Student-facilitator: Current Degree Program and HPC Experience.
Mentor: Degree and Current Occupation.
Researcher/Educator: Degree and Current Occupation.

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
    Then I should see "Academic Status"
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
    When I fill in "edit-field-citizenships-0-value" with "Test"
    When I click "op"
    Then I should be on "/people/card"
