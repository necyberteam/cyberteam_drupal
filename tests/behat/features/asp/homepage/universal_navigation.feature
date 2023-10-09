@asp
@api
@javascript

Feature: test Universal Navigation menu
  - links in the upper left should go to allocations, support, operations, and metrics.
  - authenticated sees "create ticket" button that links to /help-ticket
  - "ACCESS Home" links to access-ci.org.
  TODO: search links to Knowledge Base page.

  Scenario: authenticated user, test "Create Ticket"
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Create Ticket"
    Then I should be on "/help-ticket"

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

