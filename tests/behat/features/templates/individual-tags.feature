@templates
@api

Feature: test individual tags page
  To test an individual tag
  While either authenticated or not
  I can verify tag components appear as expected

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
    # And I should see "researcher/educator"
    And I should see "Jetstream-2"
    And I should see "There are no resources associated with this topic"
    And I should see "There are no projects associated with this topic"
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
    # resource is ACCESS-support
    When I select "618" from "edit-field-affinity-group"
    # tag is "login"
    When I select "682" from "edit-field-tags"
    When I check "Published" 
    When I press "Save" 
    Then I should see "has been created"

    Given I am not logged in
    When I go to "tags/login"
    Then I should see "test-affinity-group"
    When I follow "test-affinity-group"
    Then I should see "Members get updates about news, events, and outages"
    And I should see "test-affinity-group"

  Scenario: Add a "test-login-resource" for login tag and verify it appears
    Given I am logged in as a user with the "administrator" role
    When I go to "resources"
    When I follow "Add new resource"
    Then I should see "Add"
    When I fill in "title" with "test-login-resource"
    When I select "learning" from "category"
    When I check "Approved"
    When I check "login"
    When I press "Submit"
    Then I should see "test-login-resource"

    Given I am not logged in
    When I go to "tags/login"
    Then I should see "test-login-resource"
    When I follow "test-login-resource"
    Then I should see "votes"
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
    Then I should see "test project description"
    When I go to "tags/password"
    Then I should see "test-project-title"

    


