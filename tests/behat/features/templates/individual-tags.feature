@cyberteam
@api
Feature: test individual tags page
  Tests for individual tags page

   Scenario: Verify content for tag "ai"
      Given I am not logged in
      When I go to "tags"
      When I follow "ai"
      Then I should be on "tags/ai"
      And I should see "Mentors and Regional Facilitators"
      And I should see "Grant Scott"