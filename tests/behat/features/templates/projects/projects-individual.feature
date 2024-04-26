@templates
@api
@javascript

Feature: test individual projects page
  TODO:  make sure following steps are tested, both as authenticated and unauthenticated user
    Page title is the Project’s title
    Project Image displayed under title (if any)
    Project Information block displays:
      Tags (if any; each tag links to its own tag page)
      Project Status
      Project Region
      Submitted By (links to user’s profile)
      Project Email (link requests to open email app)
      Project Institution
      Anchor Institution (if any)
      Project Address (if any)
      Mentors (if any; each name links to user’s page)
      Student-facilitators (if any; each name links to user’s page)
      “I’m interested” button should not show
    Project Description block displays project description
    Blogs related to this project are displayed in blocks containing:
      Blog Image
      Blog Title (links to blog’s page)
      Tags (if any; each tag links to its own tag page)
      The project related to this blog (links to project’s page)

  Scenario: Remove all projects and verify empty messages
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/structure/webform/manage/project/results/submissions"
    # TODO -- figure out how to select all rows in table -- following doesn't work
    # jira:  https://cyberteamportal.atlassian.net/browse/D8-1796
    # Items below are selection of created projects but the numbers change so this
    # doesn't work -- screenshot shows no rows selected
    # maybe this is not feasible in behat and we can leave as is, since it tests
    # part of the form and we have other tests that
    #When I check "items[1]"
    #When I check "items[2]"
    #When I check "items[3]"
    #When I check "Select all rows in this table"
    When I select "Delete submission" from "edit-action"
    When I press "Apply to selected items"
    #Then I should see "Delete these submissions"


  Scenario: Unath user must login to create a project
    Given I am not logged in
    When I go to "/projects"
    Then I should see "Login to Add New Project"
    When I follow "Login to Add New Project"
    Then I should be on "user/login"
    And I should see "Login with"


  Scenario: Auth user does not need to login to create a project
    Given I am logged in as a user with the "authenticated" role
    When I go to "/projects"
    Then I should see "Submit New Project"
    When I follow "Submit New Project"
    Then I should see "Project Description"


  Scenario: Verify home page shows project
    Given I am not logged in
    When I am on the homepage
    When I wait for the page to be loaded
    Then I should see "Featured Projects"
    When I follow "Featured Projects"
    And I wait 2 seconds
    And I should see "test-create-project-title"
    When I follow "login"
    And I wait for the page to be loaded
    Then I should be on "tags/login"

  Scenario: Verify home page shows project for authenticated user
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then I should see "Featured Projects"
    When I follow "Featured Projects"
    And I wait 2 seconds
    And I should see "test-create-project-title"
    When I follow "login"
    And I wait for the page to be loaded
    Then I should be on "tags/login"

  Scenario: Verify unauth user can see test project
    Given I am not logged in
    When I go to "/projects"
    # test case-insensitive searching
    When I fill in "search" with "CREATE"
    Then I should see "test-create-project-title"
    When I follow "test-create-project-title"
    And I wait for the page to be loaded
    Then I should see "test-create-project-title"
    And I should see "login"
    Then I should see "Submitted by:"
    And I should see "At-Large"
    And I should see "In Progress"
    And I should see "test@email.com"
    And I should see "test Project Institution"
    And I should see "test Address"
    And I should see "test Address 2"
    And I should see "test City/Town"
    And I should see "Alabama"
    And I should see "98765"
    And I should see "test project description"
    Then I should not see "I’m interested"
    And I should see "http://test.com"
    And I should see "33"

  Scenario: Verify auth user can see test project
    Given I am logged in as a user with the "authenticated" role
    When I go to "/projects"
    When I fill in "search" with "CREATE"
    Then I should see "test-create-project-title"
    When I follow "test-create-project-title"
    And I wait for the page to be loaded
    Then I should see "test-create-project-title"
    And I should see "login"
    Then I should see "Submitted by:"
    And I should see "At-Large"
    And I should see "In Progress"
    And I should see "test@email.com"
    And I should see "test Project Institution"
    And I should see "test Address"
    And I should see "test Address 2"
    And I should see "test City/Town"
    And I should see "Alabama"
    And I should see "98765"
    And I should see "test project description"

    #Interested button is not able to be clicked - https://cyberteamportal.atlassian.net/browse/D8-1787
    #When I click "I'm interested"
    #Then I should see "Interested"
    #When I click "I'm interested"
    #Then I should see "I'm interested"
    And I should see "http://test.com"
    And I should see "33"
