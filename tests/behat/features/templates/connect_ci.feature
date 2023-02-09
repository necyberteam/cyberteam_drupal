@templates
@api
@javascript

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
    When I follow "Card View"
    Then I should be on "/regions"
    When I follow "CAREERS Cyberteam"
    Then I should be on "https://careers-ct.cyberinfrastructure.org/?_gl=1*nuhgh5*_ga*MTM3NDk2NzcyMC4xNjYzMDMzNjc3*_ga_CNLGPXPT91*MTY3NTg5NTgyMi44Ny4xLjE2NzU4OTU5MzkuMC4wLjA."
    When I go to "regions"
    When I follow "ArcGIS Users"
    Then I should be on "https://campuschampions.cyberinfrastructure.org/affinity-groups/arcgis-users?_gl=1*1ddouy5*_ga*MTM3NDk2NzcyMC4xNjYzMDMzNjc3*_ga_CNLGPXPT91*MTY3NTg5NTgyMi44Ny4xLjE2NzU4OTU5OTUuMC4wLjA."







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
    Then I should be on "https://careers-ct.cyberinfrastructure.org/?_gl=1*nuhgh5*_ga*MTM3NDk2NzcyMC4xNjYzMDMzNjc3*_ga_CNLGPXPT91*MTY3NTg5NTgyMi44Ny4xLjE2NzU4OTU5MzkuMC4wLjA."
    When I go to "regions"
    When I follow "ArcGIS Users"
    Then I should be on "https://campuschampions.cyberinfrastructure.org/affinity-groups/arcgis-users?_gl=1*1ddouy5*_ga*MTM3NDk2NzcyMC4xNjYzMDMzNjc3*_ga_CNLGPXPT91*MTY3NTg5NTgyMi44Ny4xLjE2NzU4OTU5OTUuMC4wLjA."
