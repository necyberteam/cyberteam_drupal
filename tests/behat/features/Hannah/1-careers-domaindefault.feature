@wip--
@api
@javascript

Feature: test careers domain
  In order to test the careers domain
  As a user of the admin role
  I need to switch careers to the default domain

  Scenario: Admin user sets careers domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/careersct_cyberinfrastucture_org"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "Learn more about how CAREERS can benefit your research"
    #Then I should see "CAREERS: Bringing Computing Support to Small to Mid-Size Institutions in the Northeast U.S."
    #Then I should see "About Us"
    #When I click "About Us"
    #Then I should see "About"

