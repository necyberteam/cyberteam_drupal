@champ
@api
@javascript

Feature: test for the affinity groups page as an authenticated user 
  Scenario: User runs through the affinity group page and individual page as authenticated.
    Given I am logged in as a user with the "authenticated" role
    When I go to "/affinity-groups"
    Then I should see "Affinity Group"
    Then I should see "Description"
    Then I should see "Tags"
    Then I should see "Join"
    When I click "Join"
    Then I should see "Joined"
    When I click "Leave"
    Then I should see "Join"
    Then I should see "Request an Affinity Group"
    When I click "Request an Affinity Group"
    Then I should not see "Approved"
    Then I should see "Affinity Group Name"
    Then I should see "Affinity Group Image"
    #Then I should see "Region"
    Then I should see "Coordinators"
    Then I should see "Tags"
    Then I should see "Short Description"
    Then I should see "Provide a link to the Slack group if applicable"
    Then I should see "Q&A Platform"
    Then I should see "Github Organization"
    Then I should see "Email List"
    When I go to "/affinity-groups/cloud-computing"
    And I wait for the page to be loaded
    Then I should see "Join"
    When I click "Join"
    Then I should see "Joined"
    When I click "Leave"
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Coordinators"
    Then I should see "Events"
    Then I should see "Resources"
    Then I should see "People"
    #Then I should see "Masquerade"
