@cyberteam
@api
Feature: news page contains "News"
  news page contains "News"

  Scenario: News page displays Articles and Releases
    Given I am not logged in
    When I go to "news"
    Then I should see "News"
    And I should see "Published Articles"
    And I should see "Press Releases"

  Scenario: A MGHPCC news page shows title date and byline
    Given I am not logged in
    When I go to "news/article/mghpcc-explores-strategies-sc21-increase-hpc-access-and-collaboration"
    Then I should see "MGHPCC Explores Strategies"
    And I should see "Nov 12, 2021"
    And I should see "John Goodhue, will be co-leading another BOF session"

  Scenario: A specific press release shows expected title
    Given I am not logged in
    When I go to "news/press/tools-expand-high-performance-research-computing-be-explored-regional-conference"
    Then I should see "Tools to Expand High Performance"
