@wip
@api
@javascript

Feature: verify the approval process of a MATCH Engagement

  Scenario: Pecan Pie user creates a match-plus engagement
    Given I am logged in with email "pecan@pie.org"
    When I go to "/ci-links"
    Then I should see "ci-link-for-user-200"
