@asp
@api
@javascript

Feature: test Universal Navigation menu
  Links in the upper left should got to allocations, support, operations, and metrics.
  "ACCESS Home" links to access-ci.org.
  TODO: search links to Knowledge Base page.
  TODO: "ACCESS Menu"has links to About, Announcements, Contact,
  Events & Trainings, News, Outages, and Resource Providers
  TODO: anonymous has link to login, questions, register, reset password.
  TODO: authenticated has My ACCESS menu with links to Allocations,
  Community Persona, Edit Profile, Publications, Share with ORCID, and Logout.
  TODO: anonymous sees button "login to create ticket" that links to /user/login
  TODO: authenticated sees "create ticket" button that links to https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/17

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

