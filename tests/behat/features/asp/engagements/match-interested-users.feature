@asp
@api
@javascript


  Scenario: administrator user tests the MATCH Interested Users Page
    Given I am logged in as a user with the "administrator" role
    When I go to "/match-interested-users"
    Then I should see "match interested users"
    Then I should see "Title"
    Then I should see "Interested Users"
    Then I should see "Node ID"
    Then I should see "Roles"
    Then I should see "Should fail@#@@"
