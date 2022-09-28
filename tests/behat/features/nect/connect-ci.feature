@nect
@api
Feature: test connect.ci page
  In order to test the Connect.CI page

  Scenario: User is on the Connect.CI Page
    Given I am not logged in
    When I go to "regions"
    Then I should see "Connect.CI"
    And I should see "Card View"
    And I should see "List View"
    And I should see "Programs"
    And I should see "Affinity Groups"
    When I follow "List View"
    Then I should be on "connectci_list"