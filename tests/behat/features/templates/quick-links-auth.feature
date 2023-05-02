@templates
@api
@javascript

Feature: test quick links on home page
  In order to test the quick links
  As a user of the authenticated role

  Scenario: Authenticated user tests the quick links
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should see the link "Ask the Community"
    When I click "Ask the Community"
    Then I should be on "https://ask.cyberinfrastructure.org/"
    When I am on the homepage
    When I click "Find CI Links"
    Then I should be on "/ci-links"
    When I am on the homepage
    Then I should see the link "Project Submission Form"
    When I click "Project Submission Form"
    Then I should be on "/form/project"
    When I am on the homepage
    Then I should see the link "All Projects"
    When I click "All Projects"
    Then I should be on "projects"
    When I am on the homepage
    Then I should see the link "Find Projects by Tag"
    When I click "Find Projects by Tag"
    Then I should be on "tags"
    When I am on the homepage
    Then I should not see "Join the team"
    Then I should see "Featured Projects"
