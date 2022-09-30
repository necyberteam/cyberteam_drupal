@ky
@api

Feature: test ky domain
  In order to test the ky domain
  As a user of the admin role
  I need to switch ky to the default domain

  Scenario: Admin user sets ky domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/kycyberteam_cyberinfrastructure_org"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "Institutions in Kentucky and Surrounding States"

