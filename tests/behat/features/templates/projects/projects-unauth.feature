@templates
@api
@javascript

Feature: test projects/engagements page
  In order to test the Project/Engagements Page

  Scenario: Unauthenticated user Test the Projects/Engagements Page
    Given I am not logged in
    When I go to "/projects"
    Then I should see "Projects"
    Then I should see " Login To Add New Project"
    Then I should see "Title"
    Then I should see "Project Institution"
    Then I should see "Project Owner"
    Then I should see "Tags"
    Then I should see "Status"
    Then I should see "Project Leader"
    When I fill in "edit-search--2" with "test"
    And I wait 5 seconds
    Then I should see "Test"
    When I fill in "edit-search--2" with "testy2002"
    And I wait 5 seconds
    Then I should see "There are no projects at this time. Please check back often as projects are added regularly."

    When I fill in "edit-search--2" with ""
    And I wait 5 seconds
    When I click "login"
    Then I should be on "/tags/login"


