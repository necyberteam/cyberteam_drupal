@asp--disabled until amp_dev.install working
@api
@javascript

Feature: test ACCESS Support Community Persona

  Scenario: Unauthenticated user tests the Community Persona for user 200
    Given I am not logged in
    When I go to "/community-persona/200"
    And I wait for the page to be loaded
    Then I should see "walnut pie"
    #Then I should see "institution-for-walnut-pie"
    #Then I should see "3rd year undergraduate"
    Then I should see "Not a CSSN Member"
    Then I should see "Find out More"

    Then I should see "Roles:"
    Then I should see "student-facilitator"
    Then I should see "Affinity Group Leader"

    Then I should see "Send Email"

    Then I should see "Programs"
    Then I should see "Northeast"

    Then I should see "Interests"
    Then I should see "access-acount"
    Then I should see "science gateway"

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
    Then I should see "pecan pie"
    Then I should see "institution-for-pecan-pie"
    Then I should see "Not a CSSN Member"
    Then I should see "Find out More"

    Then I should see "Roles:"
    Then I should see "CCMNet PM"
    Then I should see "CampusChampionsAdmin"

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



  Scenario: Specific user tests their own Community Persona
    Given I am logged in as a user with the "administrator" role
    When I go to "/community-persona"
    And I wait for the page to be loaded
    Then I should see "Community Persona"
    #Then I should see "institution-for-walnut-pie"
    Then I should see "Join the CSSN"
    Then I should see "Find out More"

    Then I should see "Roles:"
    Then I should see "administrator"
    Then I should see "Edit Roles"
    Then I should see "Edit Persona"

    Then I should see "My Interests"
    Then I should see "Update interests"

    Then I should see "My Expertise"
    Then I should see "Update expertise"

    Then I should see "My Affinity Groups"
    Then I should see "All Affinity Groups"

    Then I should see "My Knowledge Base Contributions"
    Then I should see "Add CI Link"

    Then I should see "My MATCH Engagements"
    Then I should see "See Engagements"

    Then I should see "My Projects"
    Then I should see "You currently have not been associated with any Projects. Click below to find a project."
    Then I should see "See Projects"


  Scenario: Admin user adds an engagement and it appears on their community persona
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/match_engagement?type=plus"
    And I wait for the page to be loaded
    When I fill in "edit-title-0-value" with "test-admin-created-engagement"
    When I press "Save"
    When I go to "/community-persona"
    Then I should see "test-admin-created-engagement"
