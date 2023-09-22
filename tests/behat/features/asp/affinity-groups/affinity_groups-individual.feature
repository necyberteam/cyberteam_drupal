@asp
@api
@javascript

Feature: Feature: test an Affinity Groups page
  An Affinity Group page should display the title, logo, description, and tags.
  Groups that have specified an optional Slack, Q&A, GitHub, or email link should
  display a button with the appropriate link.
  This test checks the following:
    Join is & Leave an
    Join on Slack (if applicable, links to slack group)
    Visit Q&A Platform (if applicable, links to Ask.CI)
    Mailing List (if applicable, links to email)
    Github Organization (e.g. /affinity-groups/open-ondemand)
    Coordinators (links to individual peoples profiles)
    Events (if none, filler text “No upcoming events”)
    Associated Resources accordion shows information about the resource on ACCESS RP AGs
    Recommended Resources accordion shows recommendations on Community AGs

  # TODO get this to work
  # I have not be able to add an existing CI Link to the affinity group.
  # The UI does not allow me to add an existing CI Link to the AG.
  # The name of the CI Link gets appended with a variable suffix (like "ci-link-for-user-200 (5)")
  # but I'm haven't figured out what that number should be ahead of time.
  #Scenario: Admin user adds a CI Link to the AG ACCESS Support
    Given I am logged in as a user with the "administrator" role
    # add a CI-Link to an AG
    When I go to "node/327/edit"
    Then I should see "Edit Affinity Group ACCESS Support"
    # this CI link is created by amp_dev.install
    When I fill in "Display CI Links on your Affinity Group" with "ci-link-for-user-200"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "Affinity Group ACCESS Support has been updated."
    When I follow "ci-link-for-user-200"
    And I wait 1 seconds
    Then I should see "ci-link-for-user-200"


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
    # TODO need a future event for the following
    # Then I should see "[4/04/2023 7:00 PM EDT]"
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
    # TODO -- the UI for ASP for the recommended resources is not the same as the UI for
    # the cyberteams domains -- the following does not work.  Not sure how to test
    # these accordion elements.
    #When I press "NCSA Delta GPU (Delta GPU)"
    #Then I should see "The Delta GPU resource comprises 4 different node configurations"
    #When I press "NCSA Delta GPU (Delta GPU)"
    #Then I should not see "The Delta GPU resource comprises 4 different node configurations"


  Scenario: Unauthenticated user tests another AG with Allocated CiDeR Resources
    Given I am not logged in
    # Test toggling visibility of subtext
    When I go to "/affinity-groups/delta"
    Then I should see an image with alt text "Delta ACCESS Affinity Group logo"
    Then I should see "DELTA is a dedicated, ACCESS-allocated resource designed by HPE and NCSA"
    Then I should see "Allocated CiDeR Resources"
    Then I should see "NCSA Delta GPU (Delta GPU)"
    Then I should not see "The Delta GPU resource comprises 4 different node configurations"
    # TODO -- the UI for ASP for the recommended resources is not the same as the UI for
    # the cyberteams domains -- the following does not work.  Not sure how to test
    # these accordion elements.
    #When I press "NCSA Delta GPU (Delta GPU)"
    #Then I should see "The Delta GPU resource comprises 4 different node configurations"
    #When I press "NCSA Delta GPU (Delta GPU)"
    #Then I should not see "The Delta GPU resource comprises 4 different node configurations"


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
