@asp
@api
@javascript

Feature: test Universal Navigation menu

  Scenario: test allocations link
    Given I am not logged in
    When I am on the homepage
    When I follow "Allocations"
    Then I should be on "https://allocations.access-ci.org/"

  Scenario: test support link
    Given I am not logged in
    When I am on the homepage
    When I follow "Support"
    Then I should be on the homepage

  Scenario: test operations link
    Given I am not logged in
    When I am on the homepage
    When I follow "Operations"
    Then I should be on "https://operations.access-ci.org/"

  Scenario: test operations link
    Given I am not logged in
    When I am on the homepage
    When I follow "Metrics"
    Then I should be on "https://metrics.access-ci.org/"
