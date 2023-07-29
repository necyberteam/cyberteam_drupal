@asp
@api
@javascript

Feature: test resource page
  In order to test the resource page

  Scenario: Unauthenticated user tests the resource page
    Given I am not logged in
    When I go to "/ci-links"
    Then I should see "CI Links"
    Then I should see "These CI links are crowd-sourced from the ConnectCI community"
    When I click "Add new CI Link"
    Then I should be on "/user/login?destination=/form/resource"

    When I go to "/ci-links"
    When I fill in "edit-search--2" with "test"
    Then I should see "These CI links are crowd-sourced from the ConnectCI"
    Then I should see "test"
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    Then I should see "Affinity Group"

    # edit-skill-level-307--2 is the Expert radio button
    When I fill in "edit-search--2" with ""
    When I check "edit-skill-level-307--2"
    And I wait 4 seconds
    Then I should see "There are no CI Links at this time. Please check back often as CI Links are added regularly."
    When I uncheck "edit-skill-level-307--2"
    And I wait 4 seconds
    When I fill in "edit-search--2" with "somthing545"
    And I wait 4 seconds
    Then I should see "There are no CI Links at this time. Please check back often as CI Links are added regularly."

    When I go to "/ci-links"
    When I fill in "edit-search--2" with "test"
    And I wait 4 seconds
    When I click "test-login-resource"
    Then I should get a "200" HTTP response
