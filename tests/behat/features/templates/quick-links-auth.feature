@templates
@api
@javascript

Feature: The Front Page includes a site slogan, which is region-specific,
and for the CAREERS region, there's an "About Us" button leading to the About Us page.

For the Regional Sites Front Page, it features:

Quick Links
Get Help Icon
"Ask the Community" (redirects to http://ask.ci in a new tab)
"Find Learning Resources" link (redirects to the resources page)
Submit a Project Icon
"Project Submission Form" link (redirects to add a new project page)
"All Projects" link (redirects to the projects page)
"Find Projects by Tag" link (redirects to the tags page)
"Join the Team" icon is not shown
"Featured Projects Title" links to the projects page,
displaying only projects from the current or At-Large regions.

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
