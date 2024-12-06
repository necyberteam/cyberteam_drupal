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
    Then I should see "Affinity Group"
    Then I should see "Request An Affinity Group"

    When I go to "/affinity-groups/access-support"
    Then I should see "Members get updates"
    Then I should see "ACCESS Support"
    Then I should see "ACCESS-website"
    Then I should see "Become an ACCESS Support insider by joining our affinity group."
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Events"
    Then I should see "Knowledge Base Resources"
    Then I should see "Announcements"
    Then I should see "People"


