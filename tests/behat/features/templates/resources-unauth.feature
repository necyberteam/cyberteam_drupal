@templates
@api
@javascript

Feature: test resource page
  In order to test the resource page

  Scenario: Unauthenticated user tests the resource page
    Given I am not logged in
    When I go to "/resources"
    Then I should see "Resources"
    Then I should see "These resources have been crowd-sourced from the ConnectCI community"
    Then I should see "ADD NEW RESOURCE"
    When I click "Add new resource"
    Then I should be on "/user/login?destination=/form/resource"

    When I go to "/Resources"
    When I fill in "edit-search--2" with "test"
    Then I should see "These resources have been crowd-sourced from the ConnectCI"
    Then I should see "test"
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    Then I should see "Affinity Group"
    # edit-skill-level-304--2 is the Beginner radio button
    When I check "edit-skill-level-304--2"
    And I wait 4 seconds
    Then I should see "There are no resources at this time. Please check back often as resources are added regularly."
    When I uncheck "edit-skill-level-304--2"
    And I wait 4 seconds
    When I fill in "edit-search--2" with "somthing545"
    And I wait 4 seconds
    Then I should see "There are no resources at this time. Please check back often as resources are added regularly."
    When I click "Card View"
    Then I should see "test-login-resource"
    Then I should see "Learning"
    Then I should see "login"
    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    When I click "test-login-resource"
    Then I should get a "200" HTTP response
