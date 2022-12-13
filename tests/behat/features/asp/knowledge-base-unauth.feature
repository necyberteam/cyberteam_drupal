@asp
@api
@javascript

Feature: test ACCESS Support knowledge base
  In order to test the knowledge base

  Scenario: Unauthenticated user tests the knowledge base
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Find what you're looking for"
    Then I should see "Knowledge Base"
    Then I should see "ACCESS Knowledge Base"
    Then I should see "Explore the Knowledge Base and connect with community experts and other researchers"
    Then I should see "Browse the Documentation"
    Then I should see "Resource provider guides with specific information about"
    Then I should see "View Documentation"
    Then I should see "Ask.CI Q&A"
    Then I should see "Browse questions and answers on our expert-monitored Q&A platform"
    Then I should see "Visit ASK.CI"
    Then I should see "Crowd-sourced information"
    Then I should see "Useful resources contributed by the community"
    Then I should see "Visit Resources"
    Then I should see "Community Affinity Groups"
    Then I should see "Engage in direct connections with community experts and other researchers through, Slack, email and Q&A forums."
    Then I should see "Explore Groups"
    Then I should see "Getting started with ACCESS"
    Then I should see "ACCESS services are many and varied including allocations,"
    Then I should see "View this Documentation"
    Then I should see "Go To Allocations"
    Then I should see "View Cheatsheet"
    When I click "Visit Resources"
    Then I should be on "/resources"
    When I go to "/knowledge-base"
    Then I should see "Explore Groups"
    When I click "Explore Groups"
    Then I should be on "/affinity_groups"