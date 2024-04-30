@usrse
@api
@javascript

Feature: test usrse domain
  In order to test the usrse domain
  As a user of the admin role
  I need to switch usrse to the default domain

  Scenario: Admin user sets usrse domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/usrse_cyberinfrastructure_org"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.cnctci.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response

