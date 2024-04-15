@champ
@api
@javascript

Feature: For unauthenticated users on the Campus Champion domains,
the Affinity Groups section presents a list of groups, each with a
link to the group, a short description, and associated tags. For each
Affinity Group, the page features the logo, name, description, and an
inactive "Join" button. Coordinators, events with links, resources, and
people are listed, along with constant "Join" functionality and additional buttons based on form content.

  Scenario: User runs through the affinity group page and individual page.
    Given I am not logged in
    When I go to "/affinity-groups"
    Then I should see "affinity groups"
    Then I should see "Logo"
    Then I should see "Affinity Group"
    #Then I should see "Join"
    Then I should see "Request An Affinity Group"
    When I go to "/affinity-groups/cloud-computing"
    And I wait for the page to be loaded
    Then I should see "Members get updates"
    Then I should see "Cloud Computing"
    Then I should see "cloud-commercial"
    Then I should see "People who use or are considering"
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Events"
    Then I should see "CI Links"
    Then I should see "Announcements"
    Then I should see "People"


