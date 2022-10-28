@gpc
@api
@javascript

Feature: test gpc domain
  In order to test the gpc domain
  As a user of the admin role
  I need to switch gpc to the default domain

  Scenario: Admin user sets gpc domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/greatplains_wpi_edu"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "The Great Plains CyberTeam is a distributed mentor-mentee workforce development"

