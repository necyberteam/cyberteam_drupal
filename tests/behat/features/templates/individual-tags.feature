@cyberteam
@api

Feature: test individual tags page
  To test an individual tag
  While either authenticated or not
  I can modify tag complents  on the tag page
    
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

    
  Scenario: Verify non-admin content for tag "bioinformatics"
    Given I am not logged in
    When I go to "tags/bioinformatics"
    Then I should see "bioinformatics"
    And I should see "Mentors and Regional Facilitators"
    And I should see "Brett Milash"
    And I should see "RMACC"
    And I should see "Topics from Ask.CI"
    And I should see "Juan Vanegas"
    And I should see "researcher/educator"
    And I should see "Jetstream-2"
    And I should see "There are no resources associated with this topic"
    And I should see "There are no projects associated with this topic"
    And I should see "There are no Blog Entries associated with this topic."
    And I should not see "Export Mailing List"

  Scenario: Verify admin content for tag "bioinformatics" shows mailing list
    Given I am logged in as a user with the "administrator" role
    When I go to "tags/bioinformatics"
    And I should see "Export Mailing List"


