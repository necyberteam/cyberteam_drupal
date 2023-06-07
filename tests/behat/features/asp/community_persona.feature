@wip
@api
@javascript

Feature: test ACCESS Support Community Persona

  Scenario: Unauthenticated user tests the Community Persona for user 200
    Given I am not logged in
    When I go to "/community-persona/200"
    And I wait for the page to be loaded
    Then I should see "Walnut Pie"
    Then I should see "institution-for-walnut-pie"
    Then I should see "3rd year undergraduate"
    Then I should see "Not a CSSN Member"
    Then I should see "Find out More"

    Then I should see "Roles:"
    Then I should see "Affinity Group Leader"
    Then I should see "student-facilitator"

    Then I should see "Send Email"

    Then I should see "Programs"
    Then I should see "Northeast"

    Then I should see "Interests"
    Then I should see "science gateway"
    Then I should see "access-acount"

    Then I should see "Affinity Groups"
    Then I should see "DELTA"

    Then I should see "Knowledge Base Contributions"
    Then I should see "ci-link-for-user-200"

    Then I should see "MATCH Engagements"
    Then I should see "No matched Engagements."

    Then I should see "Projects"
    Then I should see "No Projects."



  Scenario: Unauthenticated user tests the Community Persona for user 201
    Given I am not logged in
    When I go to "/community-persona/201"
    And I wait for the page to be loaded
    Then I should see "Pecan Pie"
    Then I should see "institution-for-pecan-pie"
    Then I should see "Not a CSSN Member"
    Then I should see "Find out More"

    Then I should see "Roles:"
    Then I should see "CampusChampionsAdmin"
    Then I should see "CCMNet PM"

    Then I should see "Send Email"

    Then I should see "Programs"
    Then I should see "Northeast"

    Then I should see "Interests"
    Then I should see "distributed-computing"
    Then I should see "data-management-software"

    Then I should see "Affinity Groups"
    Then I should see "DELTA"
    Then I should see "Rockfish"

    Then I should see "Knowledge Base Contributions"
    Then I should see "ci-link-for-user-201"

    Then I should see "MATCH Engagements"
    Then I should see "No matched Engagements."

    Then I should see "Projects"
    Then I should see "No Projects."


  Scenario: Authenticated user tests the Community Persona
    Given I am logged in as a user with the "authenticated" role
    When I go to "/community-persona"
    And I wait for the page to be loaded
    Then I should see "Community Persona"
    Then I should see "Roles:"
    Then I should see "Edit Roles"
    Then I should see "Programs"
    Then I should see "Edit persona"
    Then I should see "My Interests"
    Then I should see "Update interests"
    Then I should see "My Expertise"
    Then I should see "Update expertise"
    Then I should see "My Affinity Groups"
    Then I should see "All Affinity Groups"
    Then I should see "My Knowledge Base Contributions"
    Then I should see "Add CI Link"
    Then I should see "My MATCH Engagements"
    Then I should see "My Projects"
    Then I should see "See Projects"

