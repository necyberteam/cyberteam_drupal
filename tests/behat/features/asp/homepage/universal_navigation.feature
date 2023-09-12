@asp
@api
@javascript

Feature: test Universal Navigation menu
  - links in the upper left should go to allocations, support, operations, and metrics.
  - anonymous sees button "login to create ticket" that links to /user/login
  - authenticated sees "create ticket" button that links to https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/17
  - "ACCESS Home" links to access-ci.org.
  TODO: search links to Knowledge Base page.

  Scenario: authenticated user, test "Create Ticket"
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Create Ticket"
    Then I should be on "/servicedesk/customer/portal/2/group/3/create/17"

  Scenario: anonymous user, test "Login to Create Ticket"
    Given I am not logged in
    When I am on the homepage
    Then I should see "Login to Create Ticket"
    When I follow "Login to Create Ticket"
    Then I should be on "/user/login"

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

