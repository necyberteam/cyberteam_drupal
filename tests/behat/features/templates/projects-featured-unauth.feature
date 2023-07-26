@wip
@api
@javascript

Feature: test Featured projects on home page

  Scenario: Unauthenticated user tests Featured projects on home page
    Given I am not logged in
    When I am on the homepage
    Then I should see "Featured Projects"
    When I click "Featured Projects"
    Then I should be on "projects"
    Then I should see "Recruiting"
    When I fill in "edit-search--2" with "test-create-"
    #And I wait 4 seconds
    Then I should see "test-create-recruiting-project-title"
    Then I should see "login"
    When I click "test-create-recruiting-project-title"
    Then I should get a "200" HTTP response

