@coco
@api
@javascript
Feature: test coco domain
  In order to test the coco domain

  Scenario: Authenticated/Unauthenticated user navigates through coco domain
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    #Logo is not working
    #Then I should see "logo"
    Then I should not see "About Us"
    Then I should not see "Get Help"
    Then I should not see "Projects"

    Then I should see "Campus Champions"
    Then I should see "CaRCC"
    Then I should see "Careers CT"

    Then I should see "Community of Practice"
    Then I should see "Consortium"
    Then I should see "Grant-Funded Program"
    Then I should see "Higher Ed Institution"
    Then I should see "Non-profit"
    Then I should see "Other"

    Then I should see "Suggest new organization"

    When I click "Campus Champions"
    Then I should see "Campus Champions"
    #Then I should see "img-fluid"
    Then I should see "https://campuschampions.cyberinfrastructure.org"
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
    When I fill in "Email address" with "Test@email"
    When I fill in "Username" with "Test"
    When I fill in "First Name" with "Test"
    When I fill in "Last Name" with "Test"
    When I fill in "Institution" with "Test"
    When I fill in "Citizenships" with "Test"
    #Recaptcha does not work
    #When I check "recaptcha-anchor"
    #When I press "edit-submit"
    #Then I should see "Something"

