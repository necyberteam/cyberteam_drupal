@champ
@api
@javascript

Feature: For authenticated users, the Affinity Groups section showcases a list of groups,
each with a link to the group, a short description, and associated tags. An active "Join"
button is present, which changes to "Joined" upon clicking, displaying the tester's user
profile under 'People' on the Affinity Group page. Clicking again changes the button back
to "Join". Additionally, there's a button to request an Affinity Group that leads to the
Affinity Group Request page for authenticated users.

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
    Then I should see "Description"
    Then I should see "Summary"
    Then I should see "Provide a short description that will appear on the Affinity Groups directory page."
    Then I should see "Maximum 160 Characters Allowed"
    Then I should see "Q&A Platform"
    Then I should see "Github Organization"
    Then I should see "Email List"
    When I go to "/affinity-groups/cloud-computing"
    And I wait 4 seconds
    Then I should see "Join"
    When I click "Join"
    And I wait 4 seconds
    Then I should see "Joined"
    When I click "Leave"
    And I wait 4 seconds
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Coordinators"
    Then I should see "Events"
    Then I should see "CI Links"
    Then I should see "People"
    #Then I should see "Masquerade"
