@coco
@api
Feature: test coco domain
  In order to test the coco domain
  As a user of the admin role
  I need to switch coco to the default domain

  Scenario: Admin user sets coco domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/coco_cyberinfrastructure_org"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "Community of Communities"

