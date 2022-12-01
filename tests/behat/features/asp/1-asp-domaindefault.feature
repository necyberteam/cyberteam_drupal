@asp
@api
@javascript

Feature: test ACCESS Support domain
  In order to test the ACCESS Support domain
  As a user of the admin role
  I need to switch ACCESS Support to the default domain

  Scenario: Admin user sets ACCESS Support domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/amp_cyberinfrastructure_org"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    When I wait for the page to be loaded
    #Add in test for something on the homepage
    #Then I should get a "200" HTTP response
   # Then I should see "Community of Communities"

