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


  Scenario: Unauthenticated user tests an individual Affinity Group page
    Given I am not logged in
    When I am on "/affinity-groups/cloud-computing"
    Then I should see an image with alt text "A blue cloud"
    Then I should see "People who use or are considering the use of cloud resources"
    # follow a Tags
    When I follow "cloud-commercial"
    Then I should be on "/tags/cloud-commercial"
    When I move backward one page
    # verify text & links
    Then I should see "People who use or are considering the use of cloud resources"
    # Verify Join button is disabled
    Then I should see the ".affinity-group-buttons .btn.disabled" button is disabled
    Then link "Slack" should contain "https://campuschampions.slack.com"
    Then link "Q&A" should contain "https://ask.cyberinfrastructure.org/c/cloud-computing/66"
    Then link "Email" should contain "mailto:j_fossot@uncg.edu"
    Then I should see "Coordinators"
    When I follow "Jacob Fosso Tande"
    Then I should be on "/community-persona/952"
    Then I should see "Cloud Computing"
    Then I should see "Affinity Groups"
    When I am on "/affinity-groups/cloud-computing"
    Then link "How is storage performance for high I/O HPC jobs affected by running in the cloud?" should contain "https://ask.cyberinfrastructure.org/t/how-is-storage-performance-for-high-i-o-hpc-jobs-affected-by-running-in-the-cloud/797"
    Then link "View on Ask.CI" should contain "https://ask.cyberinfrastructure.org/c/cloud-computing/66"
    Then I should not see "View Members"


  Scenario: Unauthenticated user tests another AG, with a CI dummy_ci_link and a Ci Topic and an Event
    Given I am not logged in
    When I am on "/affinity-groups/access-support"
    Then I should see "Events"
    Then I should see "[4/04/2023 7:00 PM EDT]"
    Then link "How to Write a Successful" should contain "/events/6593"
    # TODO - once able to add a CI Link to this AG, uncomment the following
    #Then I should see "ci-link-for-user-200"
    Then link "Changing my user profile name on the" should contain "/t/changing-my-user-profile-name-on-the-access-support-portal/2479"
    When I click "How to Write a Successful"
    Then I should be on "/events/6593"


  Scenario: Unauthenticated user tests an AG with an announcement
    Given I am not logged in
    When I am on "/affinity-groups/anvil"
    Then I should see "Announcements"
    Then I should see "[12/16/2022]"
    When I click "2022 - 2023 Holiday Support Schedule for Anvil"
    Then I should be on "/node/403"


  Scenario: Unauthenticated user tests an AG with a github link
    Given I am not logged in
    When I am on "/affinity-groups/open-ondemand"
    Then link "GitHub" should contain "https://github.com/OSC/ondemand"


  Scenario: Unauthenticated user tests an AG with a github link
    Given I am not logged in
    When I am on "/affinity-groups/anvil"
    Then I should see "Announcements"
    Then I should see "[12/16/2022]"
    When I click "2022 - 2023 Holiday Support Schedule for Anvil"
    Then I should be on "/node/403"


  Scenario: Unauthenticated user tests another AG with recommended resources
    Given I am not logged in
    When I go to "/affinity-groups/ai-institutes-cyberinfrastructure"
    # Test toggling a recommended resource
    Then I should see "Recommended Resources"
    When I go to "/affinity-groups/ai-institutes-cyberinfrastructure"
    Then I should see "NCSA Delta GPU (Delta GPU)"
    Then I should not see "The Delta GPU resource comprises 4 different node configurations"
    When I press "NCSA Delta GPU (Delta GPU)"
    Then I should see "The Delta GPU resource comprises 4 different node configurations"
    When I press "NCSA Delta GPU (Delta GPU)"
    Then I should not see "The Delta GPU resource comprises 4 different node configurations"


  Scenario: Unauthenticated user tests another AG with Allocated CiDeR Resources
    Given I am not logged in
    # Test toggling visibility of subtext
    When I go to "/affinity-groups/delta"
    Then I should see an image with alt text "Delta ACCESS Affinity Group logo"
    Then I should see "DELTA is a dedicated, ACCESS-allocated resource designed by HPE and NCSA"
    Then I should see "Allocated CiDeR Resources"
    Then I should see "NCSA Delta GPU (Delta GPU)"
    Then I should not see "The Delta GPU resource comprises 4 different node configurations"
    When I press "NCSA Delta GPU (Delta GPU)"
    Then I should see "The Delta GPU resource comprises 4 different node configurations"
    When I press "NCSA Delta GPU (Delta GPU)"
    Then I should not see "The Delta GPU resource comprises 4 different node configurations"


  Scenario: Unauthenticated user tests Ask.CI Recent Topics
    Given I am not logged in
    # Test an AG with an announcement
    When I am on "/affinity-groups/anvil"
    Then I should see "Ask.CI Recent Topics"
    Then link "About the ACCESS-Anvil category" should contain "https://ask.cyberinfrastructure.org/t/about-the-access-anvil-category/2473"


  Scenario: Authenticated user can join & leave an AG
    Given I am logged in as a user with the "authenticated" role
    When I am on "/affinity-groups/cloud-computing"
    When I follow "Join"
    Then I should see "You have joined this affinity group"
    When I follow "Leave"
    Then I should see "You have left this affinity group"


  Scenario: AG Coordinator can see & download & email members
    Given I am logged in with uid "952"
    When I am on "/affinity-groups/cloud-computing"
    When I follow "View Members"
    Then I should be on "/affinity-groups/571/users/Cloud%20Computing?nid=189"
    And I should see "Download CSV"
    When I follow "Download CSV"
    Then I should get a "200" HTTP response

    When I am on "/affinity-groups/cloud-computing"
    When I follow "Email Affinity Group"
    Then I should see "Use this form to send an email message to members of your Affinity Group through Constant Contact"
    And I should see "About text formats"
    And value of element "edit-actions-submit" should contain "Send"
