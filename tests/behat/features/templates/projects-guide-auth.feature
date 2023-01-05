@templates
@api
@javascript
Feature: test project guide page 
  In order to test the project guide page



  Scenario: Administrator user test the project guide
    Given I am logged in as a user with the "administrator" role
    When I go to "/about-us/project-guide"
    Then I should see "Project Guide"
    Then I should see "Cyberteam Project Procedures"
    Then I should see "Project Solicitation and Submission"
    Then I should see "Publishing a Project"
    Then I should see "Projects per Institution"
    Then I should see "Projects per Student"
    Then I should see "Recruiting Students"
    Then I should see "Scheduling and Check-ins"
    Then I should see "Launch Presentation"
    Then I should see "Project Updates"
    Then I should see "Wrap Presentation"
    Then I should see "Finishing a Project"

