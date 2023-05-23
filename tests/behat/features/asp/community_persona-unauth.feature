@asp
@api
@javascript

Feature: test ACCESS Support Community Page
  In order to test the Community Page

  Scenario: Unauthenticated user tests the Community Page for user 1
    Given I am not logged in
    When I go to "/community-persona/1"
    And I wait for the page to be loaded
    Then I should see "Login to Create Ticket"
    Then I should see "Roles:"
    Then I should see "Find out More"
    Then I should see "Send Email"
    Then I should see "Programs"
    Then I should see "Interests"
    Then I should see "Expertise"
    Then I should see "Affinity Groups"
    Then I should see "Knowledge Base Contributions"
    Then I should see "MATCH Engagements"
    Then I should see "Projects"

  Scenario: Authenticated user tests the Community Page
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



  # TODO enable when authenticated is possible on ASP.
  # (and rename this filename to just "community.feature" or "cssn.feature")
  # Scenario: Authenticated user tests the Community Page
  #   Given I am logged in as a user with the "authenticated" role
  #   When I go to "/cssn"
  #   When I click "Join the CSSN Network"
  #   Then I should be on "/user/login"
  #
  #   When I go to "/cssn"
  #   And I click "FIND OUT MORE"
  #   Then I should be on "/ccep-pilot"


