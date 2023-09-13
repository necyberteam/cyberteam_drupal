@templates
@api
@javascript
Feature: test individual Affinity Group page
    Affinity Group Logo Image
    Affinity Group Name
    Description
    TODO: Join (if selected, button grays out and check mark appears next to “Leave”)
    TODO: Join on Slack (if applicable, links to slack group)
    TODO: Visit Q&A Platform (if applicable, links to Ask.CI)
    TODO: Mailing List (if applicable, links to email)
    TODO: Github Organization (e.g. /affinity-groups/open-ondemand)
    TODO: Coordinators (links to individual peoples profiles
    TODO: Events (if none, filler text “No upcoming events”)
    TODO: Recommended Resources for Community affinity group
    TODO: Associated Resources for ACCESS RP
    TODO: CI links
    TODO: Announcements
    TODO: Ask.ci topics

  Scenario: Unauthenticated user Test the individual Affinity Group page
    Given I am not logged in
    When I go to "/affinity-groups/cloud-computing"

    Then I should see an image with src "/sites/default/files/affinity-groups/cc%20cloud%20affinity_.png"
    Then I should see "Cloud Computing"
    Then I should see "cloud-commercial"
    Then I should see "People who use or are"
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Coordinators"
    Then I should see "Events"
    Then I should see "Resources"
    Then I should see "People"


  Scenario: Authenticated user Test the individual Affinity Group page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/affinity-groups/cloud-computing"
    And I wait 2 seconds
    Then I should see an image with src "/sites/default/files/affinity-groups/cc%20cloud%20affinity_.png"
    Then I should see "Cloud Computing"
    Then I should see "cloud-commercial"
    Then I should see "People who use or are"
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Coordinators"
    Then I should see "Events"
    Then I should see "Resources"
    Then I should see "People"
    Then I click "Join"
    #TODO verify joined?

