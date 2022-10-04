@templates
@api

Feature: test affinity group page
  In order to test the affinity group page

  Scenario: Unauthenticated user tests the affinity group
    Given I am not logged in
    When I go to "affinity-groups"
    Then I should see "Affinity Groups"

    And I should see "Logo"
    And I should see "Affinity Group"
    And I should see "Description"
    And I should see "Tags"
    And I should see "Login To Join"
    And I should see "Request an Affinity Group"
 
  