@templates
@api
@javascript
Feature: test Registration form page 
  In order to test the Registration form page

  Scenario: Unauthenticated user Test the Registration Page
    Given I am not logged in


    #student

    When I go to "/user/register/student"
    Then I should see "Create new student-facilitator account"
    Then I should see "Email Address"
    When I fill in "edit-mail" with "test@email.com"
    Then I should see "Username"
    When I fill in "Username" with "tester"
    Then I should see "First Name"
    When I fill in "First Name" with "test"
    Then I should see "Last Name"
    When I fill in "Last Name" with "test"
    Then I should see "Time zone"
    Then I should see "Institution"
    When I fill in "Institution" with "test"
    Then I should see "CV/Resume"
    Then I should see "Current Degree Program"
    Then I should see "HPC Experience"
    Then I press "edit-submit"

    #mentor

    When I go to "/user/register/mentor"
    Then I should see "Create new mentor account"
    Then I should see "Email Address"
    Then I should see "Username"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Time zone"
    Then I should see "Institution"
    Then I should see "CV/Resume"
    Then I should see "Current Occupation"
    Then I should see "Degree"

    #researcher/educator

    When I go to "/user/register/researcher"
    Then I should see "Create new researcher/educator account"
    Then I should see "Email Address"
    Then I should see "Username"
    Then I should see "First Name"
    Then I should see "Last Name"
    Then I should see "Time zone"
    Then I should see "Institution"
    Then I should see "CV/Resume"
    Then I should see "Current Occupation"
    Then I should see "Degree"
    When I press "edit-submit"

    #It shows up but the test does not read it
    #Then I should see "Please fill out this field"
    
    #Line 393 is not tested for
    #reCAPTCHA is not tested for
  
