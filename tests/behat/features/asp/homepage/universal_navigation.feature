@asp
@api
@javascript

Feature: test Universal Navigation menu
  Tests the 4 top left links of ASP:  allocations, support, operations, and metrics.
  Tests "ACCESS Home" link
  TODO:  do this when authenticated, and test search, ACCESS Menu,
    login (Unauthenticated) and My ACCESS (authenticated)

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

  Scenario: test metrics link
    Given I am not logged in
    When I am on the homepage
    When I follow "Metrics"
    Then I should be on "https://metrics.access-ci.org/"

  Scenario: test ACCESS home link
    Given I am not logged in
    When I am on the homepage
    When I follow "ACCESS Home"
    Then I should be on "https://access-ci.org/"

