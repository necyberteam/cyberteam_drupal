@templates
@api
@javascript

Feature: This Behat tests goes over the Affinity Groups Page which has the title "Affinity Groups."
  TODO: The result table presents Affinity Group Images, names, descriptions, and tags (linked to individual tag pages).
  TODO: The "Join" button changes to a greyed-out "Leave" button upon clicking
  TODO: "Request an Affinity Group" button redirects to the affinity group request form.


  Scenario: Unauthenticated user tests the affinity group
    Given I am not logged in
    When I go to "affinity-groups"
    Then I should see "Affinity Groups"
    #And I should see "Category"
    #And I should see "Tags"
    And I should see "Affinity Group"
    #And I should see "Description"
    #And I should see "Join"
    And I should see "Request an Affinity Group"

  Scenario: Authenticated user tests the affinity group
    Given I am logged in as a user with the "authenticated" role
    When I go to "affinity-groups"
    Then I should see "Affinity Groups"
    #And I should see "Category"
    #And I should see "Tags"
    And I should see "Affinity Group"
    #And I should see "Description"
    #And I should see "Join"
    And I should see "Request an Affinity Group"
