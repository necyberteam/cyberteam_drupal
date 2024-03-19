@templates
@api
@javascript

Feature: For authenticated users:

The Connect.Ci Page features a list of other Cyberteams, each linking to their respective Cyberteam prod sites.
It also displays a list of affinity groups, with clickable links to individual affinity groups.
Users have the option to toggle between card and list display formats.

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
    When I follow "Card View"
    Then I should be on "/regions"
    When I follow "CAREERS Cyberteam"
    Then I should be on "https://careers-ct.cyberinfrastructure.org"
    When I go to "regions"
    When I follow "Ask.CI Moderators"
    Then I should be on "/affinity-groups/askci-moderators"


  Scenario: User is on the Connect.CI Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "regions"
    Then I should see "Connect.CI"
    And I should see "Card View"
    And I should see "List View"
    And I should see "Programs"
    And I should see "Affinity Groups"
    When I follow "List View"
    Then I should be on "connectci_list"
    When I follow "Card View"
    Then I should be on "/regions"
    When I follow "CAREERS Cyberteam"
    Then I should be on "https://careers-ct.cyberinfrastructure.org/"
    When I go to "regions"
    When I follow "Ask.CI Moderators"
    Then I should be on "/affinity-groups/askci-moderators"
