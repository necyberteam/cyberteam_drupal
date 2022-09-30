@nect
@api
Feature: test quick links on home page
  In order to test the quick links
  As a user of the unauthenticated role

  Scenario: Unauthenticated user tests the quick links
    Given I am not logged in
    When I am on the homepage
    Then I should see the link "Ask the Community"
    When I click "Ask the Community"
    Then I should be on "https://ask.cyberinfrastructure.org/"
    When I am on the homepage
    Then I should see the link "Find Learning Resources"
    When I click "Find Learning Resources"
    Then I should be on "resources"
    When I am on the homepage
    Then I should see the link "Join as Student"
    When I click "Join as Student"
    Then I should be on "user/register/student"
    When I am on the homepage
    Then I should see the link "Join as Mentor"
    When I click "Join as Mentor"
    Then I should be on "user/register/mentor"
    When I am on the homepage
    Then I should see the link "Join as Researcher"
    When I click "Join as Researcher"
    Then I should be on "user/register/researcher"
    When I am on the homepage
    Then I should see the link "Project Submission Form"
    When I click "Project Submission Form"
    Then I should be on "user/login?destination=/form/project"
    When I am on the homepage
    Then I should see the link "All Projects"
    When I click "All Projects"
    Then I should be on "projects"
    When I am on the homepage
    Then I should see the link "Find Projects by Tag"
    When I click "Find Projects by Tag"
    Then I should be on "tags"   