@templates
@api
@javascript

Feature: Feature: test an Affinity Groups page
  An Affinity Group page should display the title, logo, description, and tags.
  Groups that have specified an optional Slack, Q&A, GitHub, or email link should display a button with the appropriate link.
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
    Associated Resources accordion shows information about the resource on ACCESS RP AGs
    Recommended Resources accordion shows recommendations on Community AGs

  Scenario: Administrator user creates CI Link and adds it to an affinity group
    Given I am logged in as a user with the "administrator" role
    When I go to "/form/ci-link"
    Then I should see "CI Link"
    When I fill in "title" with "TEST"
    When I select "learning" from "category"
    When I check "Approved"
    # login tag
    When I check "edit-tags-682"
    When I check "Beginner"
    When I fill in "Description" with "Test"
    When I fill in "Link Title" with "Test"
    When I fill in "Link URL" with "http://example.com"
    When I wait 3 seconds
    When I press "Submit"
    When I go to "node/327/edit"
    Then I should see "Edit Affinity Group ACCESS Support"
    When I fill in "Display CI Links on your Affinity Group" with "TEST (4)"
    And I wait 4 seconds
    When I press "op"


  Scenario: Unauthenticated user Test the individual Affinity Group page
    Given I am not logged in
    When I go to "/affinity-groups/cloud-computing"

    #TODO Cant test image
    #Then I should see "col-lg-4 col-md-8 mb-3"

    Then I should see "Cloud Computing"
    Then I should see "cloud-commercial"
    Then I should see "People who use or are"
    Then I should see the ".affinity-group-buttons .btn.disabled" button is disabled
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Coordinators"
    When I go to "/community-persona/952"
    Then I should see "Affinity Groups"
    Then I should see "Cloud Computing"
    When I go to "/affinity-groups/access-support"
    Then I should see "Events"
    Then I should see "[4/04/2023 7:00 PM EDT]"
    When I click "How to Write a Successful"
    Then I should be on "/events/6593"
    When I go to "/affinity-groups/anvil"
    Then I should see "Announcements"
    Then I should see "[12/16/2022]"
    When I click "2022 - 2023 Holiday Support Schedule for Anvil"
    Then I should be on "/node/403"
    When I go to "/affinity-groups/ai-institutes-cyberinfrastructure"
    Then I should see "Recommended Resources"
    #When I click ".recommended-resource-header-5945"
    #When I click "NCSA Delta GPU (Delta GPU)"
    #And I wait 3 seconds
    #Then I should see "The Delta GPU resource comprises 4 different node configurations intended to support"
    When I go to "/affinity-groups/delta"
    Then I should see "Allocated CiDeR Resources"
    Then I should see "NCSA Delta GPU (Delta GPU)"
    #When I click "NCSA Delta GPU (Delta GPU)"
    #And I wait 3 seconds
    #Then I should see "The Delta GPU resource comprises 4 different node configurations intended to support"
    When I go to "/affinity-groups/access-support"
    And I wait 3 seconds
    Then I should see "CI Links"
    Then I should see "Title"
    Then I should see "Skill Level"
    Then I should see "Tags"
    #When I click "ACCESS Support Portal"
    #Then I should be on "/ci-link/467"
    When I go to "/affinity-groups/anvil"
    Then I should see "Ask.CI Recent Topics"
    Then I should see "Topics"
    Then I should see "Last Update"
    Then I should see "Test post for Anvil Affinity Group"
    Then I should see "01/13/23"
    Then I should see "View on Ask.CI"






  Scenario: Authenticated user Test the individual Affinity Group page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/affinity-groups/cloud-computing"

    #TODO Cant test image
    #Then I should see "col-lg-4 col-md-8 mb-3"

    Then I should see "Cloud Computing"
    Then I should see "cloud-commercial"
    Then I should see "People who use or are"
    When I click "Join"
    Then I should see "Member"
    When I click "Leave"
    Then I should see "Join"
    Then I should see "Slack"
    Then I should see "Q&A"
    Then I should see "Email"
    Then I should see "Coordinators"
    #When I press "Email Affinity Group"
    #Then I should be on "/form/affinity-group-contact?nid=189"
    #Then I should see "Affinity Group Contact"
    When I go to "/community-persona/952"
    Then I should see "Affinity Groups"
    Then I should see "Cloud Computing"
    When I go to "/affinity-groups/access-support"
    Then I should see "Events"
    Then I should see "[4/04/2023 7:00 PM EDT]"
    When I click "How to Write a Successful"
    Then I should be on "/events/6593"
    When I go to "/affinity-groups/anvil"
    #Then I should see "Announcements"
    #Then I should see "[12/16/2022]"
    #When I click "2022 - 2023 Holiday Support Schedule for Anvil"
    #Then I should be on "/node/403"
    #When I go to "/affinity-groups/ai-institutes-cyberinfrastructure"
    #Then I should see "Recommended Resources"
    #When I press ".recommended-resource-header-5945"
    #When I click "NCSA Delta GPU (Delta GPU)"
    #And I wait 3 seconds
    #Then I should see "The Delta GPU resource comprises 4 different node configurations intended to support"
    When I go to "/affinity-groups/delta"
    #Then I should see "Allocated CiDeR Resources"
    #Then I should see "NCSA Delta GPU (Delta GPU)"
    #When I click "NCSA Delta GPU (Delta GPU)"
    #And I wait 3 seconds
    #Then I should see "The Delta GPU resource comprises 4 different node configurations intended to support"
    Then I should see "People"
    When I click "View Members"
    Then I should be on "/affinity-groups/607/users/DELTA?nid=297"
    Then I should see "Delta"
    Then I should see "Name"
    Then I should see "Roles"
    Then I should see "Email"
    When I click "Download CSV"
    Then I should get a 200 response
    When I go to "/affinity-groups/access-support"
    Then I should see "CI Links"
    And I wait 3 seconds
    Then I should see "Title"
    Then I should see "Skill Level"
    Then I should see "Tags"
    When I click "ACCESS Support Portal"
    Then I should be on "/ci-link/467"
    When I go to "/affinity-groups/anvil"
    Then I should see "Ask.CI Recent Topics"
    Then I should see "Topics"
    Then I should see "Last Update"
    Then I should see "Test post for Anvil Affinity Group"
    Then I should see "01/13/23"
    Then I should see "View on Ask.CI"
