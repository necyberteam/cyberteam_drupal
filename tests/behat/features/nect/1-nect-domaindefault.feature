@nect
@api
@javascript

Feature: test nect domain
  In order to test the nect domain
  As a user of the admin role
  I need to switch nect to the default domain

  Scenario: Admin user sets nect domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/nectd8_wpi_edu"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    #Then I should see "Institutions in Northern New England"

