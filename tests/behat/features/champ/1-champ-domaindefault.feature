@champ
@api
@javascript

Feature: test champ domain
  In order to test the champ domain
  As a user of the admin role
  I need to switch champ to the default domain

  Scenario: Admin user sets champ domain to the default
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/config/domain/edit/campuschampions_cyberinfrastructure_org"
    When I check "Default domain"
    When I fill in "Hostname" with "cyberteam.lndo.site"
    When I press "Save"
    Given the cache has been cleared
    When I am on the homepage
    Then I should get a "200" HTTP response
    Then I should see "Collaboratively employing advanced computing and data to tackle society's grand challenges"

