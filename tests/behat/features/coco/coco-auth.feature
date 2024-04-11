@wip
@api
@javascript
Feature: This test verifies the following for the coco domain for an authenticated user:
  CoCo logo shows
  No menu items
  Home page shows card listing of organizations
    Name, Logo, website, Description (excerpted), Type, Tags
  TODO: Home page shows exposed filters allowing user to filter orgs by type
  Unauthenticated home page shows “login to suggest a new listing” button
  Authenticated home page shows “Suggest an organization” button
  Clicking organization name takes you to the detailed organization page
    Name, Logo, website, Description (excerpted), Type, Tags, Contact button
  Clicking an organization type takes you to a listing of organizations of that type
  Clicking a tag takes you to the tag listing page
  Individual organization page shows logo, name, link, type, tags, description, and email of org
  “Suggest an organization” form (Organization | CoCo ) form contains following:
    Organization Name (required), Logo, Alt tag, Shortened name (required), Contact Email, Organization type (required), Description, Tags

  Scenario: Authenticated/Unauthenticated user navigates through coco domain
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I wait for the page to be loaded
    #Logo is not working
    Then I should see an image with alt text "CoCo"
    Then I should not see "About Us"
    Then I should not see "Get Help"
    Then I should not see "Projects"

    Then I should see "Campus Champions"
    Then I should see "CaRCC"
    Then I should see "Careers CT"

    Then I should see "Community of Practice"
    Then I should see "Consortium"
    Then I should see "Grant-Funded Program"
    Then I should see "Non-profit"

    Then I should see "Suggest new organization"

    When I click "RCD+"
    Then I should be on "glossary#rcd"
    And I should see "Research computing and data plus involves people, scholarship, and resources"

    When I am on the homepage
    When I click "Campus Champions"
    Then I should see "Campus Champions"
    #Then I should see "img-fluid"
    Then I should see "https://campuschampions.org"
    Then I should see "Community of Practice"
    Then I should see "professional-development"
    Then I should see "The Campus Champions Program"
    Then I should see "Contact"

    When I go to the homepage
    When I click "Suggest New Organization"
    Then I should see "organization name"
    Then I should see "Logo"
    Then I should see "shortened name"
    Then I should see "Organization Type"
    Then I should see "Contact Email"
    Then I should see "Description"
    Then I should see "Tags"
    Then I should see "Link URL"

    Then I click "Log out"
    When I go to the homepage
    Then I should see "Login To Suggest A New Listing"
    When I click "Join"
    Then I should see "Create new representative account"
    When I fill in "Email address" with "test231@example.com"
    When I fill in "Username" with "Test231"
    When I fill in "First Name" with "Test"
    When I fill in "Last Name" with "Test"
    When I fill in "Organization" with "MGHPCC"
    When I press "edit-submit"


