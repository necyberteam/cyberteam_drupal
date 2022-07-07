@mines
@api
Feature: test mines domain
  In order to test the mines domain
  As a user of the admin role
  I need to switch mines to the default domain

  Scenario: Admin user sets mines domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/connectcidev_wpi_edu"
    When I select "1" from "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "Helping Scientists Do Their Science"

