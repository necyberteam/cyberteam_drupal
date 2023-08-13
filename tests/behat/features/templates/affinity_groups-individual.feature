@templates
@api
@javascript
Feature: test individual Affinity Group page
  TODO: verify this test checks the following
    Affinity Group Logo Image
    Affinity Group Name
    Description
    Join (if selected, button grays out and check mark appears next to “Leave”)
    Join on Slack (if applicable, links to slack group)
    Visit Q&A Platform (if applicable, links to Ask.CI)
    Mailing List (if applicable, links to email)
    Github Organization (e.g. /affinity-groups/open-ondemand)
    Coordinators (links to individual peoples profiles
    Events (if none, filler text “No upcoming events”)
    Resources (links to individual resource pages)
    People (individual AG member cards are shown)

  Scenario: Unauthenticated user Test the individual Affinity Group page
    Given I am not logged in
    When I go to "/affinity-groups/cloud-computing"

    #TODO Cant test image
    #Then I should see "col-lg-4 col-md-8 mb-3"

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
    # verify the cloud image loads
    # TODO on github, image not getting copied yet -- wait for miles' fix
    # Then all images with selector ".img-fluid.mb-4" should load
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

