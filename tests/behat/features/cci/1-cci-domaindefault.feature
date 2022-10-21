@cci
@api
@javascript

Feature: test cci domain
  In order to test the cci domain
  As a user of the admin role
  I need to switch cci to the default domain

  Scenario: Admin user sets cci domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/connectcidev_wpi_edu"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "Connect.Cybinfrastructure is a family of portals"

