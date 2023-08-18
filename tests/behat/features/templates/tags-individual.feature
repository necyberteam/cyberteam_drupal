@templates
@javascript

Feature: test individual tags page
  To test an individual tag
  While either authenticated or not
  I can verify tag components appear as expected.
  Included in test:
   - Page title is the tag’s name
   - CILinks, category, skill level,
   - Can create a project or affinity group with a tag and the tag will appear
     on the page and can be followed
  TODO 8/4/23:
    - from 1.0 spreadsheet: Mentors/Regional Facilitators/Facilitators/RCFs/RSEs/CISEs
      with the tag (either in skills or interests; this section should display
      mentors and regional facilitators from all regions).
    - Ask.ci topics/posts with the tag (Term from Ask.CI), Topic Title (each item
      links to its topic in ask.ci, links should open in a new tab)



  Scenario: Verify non-admin content for tag "bioinformatics"
    Given I am not logged in
    When I go to "tags/bioinformatics"
    Then I should see "bioinformatics"
    And I should see "Mentors and Regional Facilitators"
    And I should see "Brett Milash"
    And I should see "RMACC"
    And I should see "Topics from Ask.CI"
    And I should see "Juan Vanegas"
    # TODO - doesn't pass on gpc
    #And I should see "researcher/educator"
    # TODO - doesn't pass on nect
    # And I should see "Jetstream-2"
    And I should see "There are no Blog Entries associated with this topic."
    And I should not see "Export Mailing List"

  Scenario: Verify admin content for tag "bioinformatics" shows mailing list
    Given I am logged in as a user with the "administrator" role
    When I go to "tags/bioinformatics"
    And I should see "Export Mailing List"

  Scenario: Add a "test-affinity-group" for login tag and verify it appears
    Given I am logged in as a user with the "administrator" role
    When I go to "node/add/affinity_group"
    When I fill in "Title" with "test-affinity-group"
    # tag is "login"
    When I select "682" from "edit-field-tags"
    When I check "Published"
    When I press "Save"
    Then I should see "has been created"

    Given I am not logged in
    When I go to "tags/login"
    Then I should see "test-affinity-group"
    When I follow "test-affinity-group"
    #Then I should see "Members get updates about news, events, and outages"
    And I should see "test-affinity-group"

    Given I am logged in as a user with the "authenticated" role
    When I go to "tags/login"
    Then I should see "test-affinity-group"
    # TODO not passing on ky
    # When I follow "test-affinity-group"
    # Then I should see "Members get updates about news, events, and outages"
    # And I should see "test-affinity-group"

  Scenario: Add a "test-login-resource" for login tag and verify it appears

    Given I am not logged in
    When I go to "tags/login"
    Then I should see "test-login-resource"
    When I follow "test-login-resource"
    And I wait for the page to be loaded
    #Then I should see "votes"
    And I should see "test-login-resource"

    Given I am logged in as a user with the "authenticated" role
    When I go to "tags/login"
    And I wait 4 seconds
    Then I should see "test-login-resource"
    When I follow "test-login-resource"
    And I wait for the page to be loaded
    # TODO not working for careers or nect -- was votes removed?
    # Then I should see "votes"
    And I should see "test-login-resource"

  Scenario: Add a "test-login-project" for login & projects tags and verify they appear
    Given I am logged in as a user with the "administrator" role
    When I go to "projects"
    When I follow "Submit New Project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-project-title"
    When I check "At-Large"
    # tags:
    When I check "login"
    When I check "password"
    When I fill in "First" with "test-first-name"
    When I fill in "Last" with "test-last-name"
    When I fill in "Email" with "test@email.com"
    When I fill in "Project Description" with "test project description"
    When I press "Submit"
    Then I should see "test-project-title"
    And I should see "test project description"

    Given I am not logged in
    When I go to "tags/login"
    Then I should see "test-project-title"
    When I follow "test-project-title"
    And I wait 2 seconds
    Then I should see "test project description"
    When I go to "tags/password"
    Then I should see "test-project-title"

    Given I am logged in as a user with the "authenticated" role
    When I go to "tags/login"
    And I wait 2 seconds
    Then I should see "test-project-title"
    When I follow "test-project-title"
    And I wait 2 seconds
    Then I should see "test project description"
    When I go to "tags/password"
    And I wait 2 seconds
    Then I should see "test-project-title"

  Scenario: Testing Tags display information for resource, projects, etc
    Given I am not logged in
    When I go to "tags/big-data"
    Then I should see "big-data"
    Then I should see "CI Links"
    Then I should see "Mentors and Regional Facilitators"
    Then I should see "Tony Elam"
    Then I should see "Kentucky"
    Then I should see "Skills"
    Then I should see "Interest"
    Then I should see "Affinity Groups"
    Then I should see "Large Data Sets"
    Then I should see "For people who evaluate or use storage options for researchers with large data sets."
    Then I should see "cloud-storage,"
    Then I should see "Join"
    Then I should see "Topics from Ask.CI"
    Then I should see "Users"
    Then I should see "Name"
    # Then I should see "student facilitator"
    Then I should see "image-processing"
    Then I should see "There are no Blog Entries associated with this topic."
