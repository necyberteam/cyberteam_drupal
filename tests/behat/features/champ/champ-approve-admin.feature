@champ--
@api
@javascript

Feature: test for the affinity groups page as an authenticated user 

  #TODO update this

  Scenario: User runs through the affinity group page and individual page as admin.
    Given I am logged in as a user with the "administrator" role
    When I go to "/affinity-groups"
    When I click "Request an Affinity Group"
    #Then I should see "masquerade"
   