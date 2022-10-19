@templates
@api
@javascript

Feature: verify unath & auth users can see the test project

  Scenario: Verify home page shows project
    Given I am not logged in
    When I am on the homepage
    Then I should see "Featured Projects"
    And I should see "test-create-project-title-for-behat"
    When I follow "login"
    Then I should be on "tags/login"
    
  Scenario: Verify home page shows project
    Given I am not logged in
    When I am on the homepage
    Then I should see "Featured Projects"
    And I should see "test-create-project-title-for-behat"
    When I follow "login"
    Then I should be on "tags/login"


  Scenario: Verify unauth user can see test project
    Given I am not logged in
    When I go to "projects"
    # test case-insensitive searching
    When I fill in "search" with "BEHAT"
    Then I should see "test-create-project-title-for-behat"
    When I follow "test-create-project-title-for-behat"
    Then I should see "test-create-project-title"
    And I should see "login"
    And I should see "At-Large"
    And I should see "Halted"
    And I should see "test@email.com"
    And I should see "test Project Institution"
    And I should see "test Address"
    And I should see "test Address 2"
    And I should see "test City/Town"
    And I should see "Alabama"
    And I should see "98765"
    And I should see "test project description"
    And I should see "http://test.com"
    And I should see "33"

  Scenario: Verify auth user can see test project
    Given I am logged in as a user with the "authenticated" role
    When I go to "projects"
    When I fill in "search" with "BEhat"
    Then I should see "test-create-project-title-for-behat"
    When I follow "test-create-project-title-for-behat"
    Then I should see "test-create-project-title"
    And I should see "login"
    # not checking everything, since tested above for non-logged in user