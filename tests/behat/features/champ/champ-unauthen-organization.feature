@champ
@api
Feature: test for the affinity groups page

  Scenario: User runs through the affinity group page and individual page.
    Given I am not logged in
    When I go to "/affinity-groups"