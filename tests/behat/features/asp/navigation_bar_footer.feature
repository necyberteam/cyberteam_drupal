@asp
@api
@javascript

Feature: test Navigation Bar footer links

  Scenario: test OnDemand link
    Given I am not logged in
    When I am on the homepage
    When I follow "OnDemand"
    Then I should be on "/ondemand"

  Scenario: test Pegasus link
    Given I am not logged in
    When I am on the homepage
    When I follow "Pegasus"
    Then I should be on "/pegasus"

  Scenario: test Science Gateways link
    Given I am not logged in
    When I am on the homepage
    When I follow "Science Gateways"
    Then I should be on "/tools/science-gateways"

  Scenario: test XDMoD link
    Given I am not logged in
    When I am on the homepage
    When I follow "XDMoD"
    Then I should be on "/xdmod"

  Scenario: test Knowledge Base link
    Given I am not logged in
    When I am on the homepage
    When I follow "Knowledge Base"
    Then I should be on "/knowledge-base"

  Scenario: test Documentation link
    Given I am not logged in
    When I am on the homepage
    When I follow "Documentation"
    Then I should be on "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/overview"

  Scenario: test Q&A Forum link
    Given I am not logged in
    When I am on the homepage
    And I wait 2 seconds
    When I follow "Q&A Forum"
    Then I should be on "https://ask.cyberinfrastructure.org/"

  Scenario: test CI link
    Given I am not logged in
    When I am on the homepage
    When I follow "CI Links"
    Then I should be on "/ci-links"

  Scenario: test MATCHPlus link
    Given I am not logged in
    When I am on the homepage
    When I follow "MATCHPlus"
    Then I should be on "/matchplus"

  Scenario: test MATCHPremier link
    Given I am not logged in
    When I am on the homepage
    When I follow "MATCHPremier"
    Then I should be on "/matchpremier"

  Scenario: test Engagements link
    Given I am not logged in
    When I am on the homepage
    When I follow "Engagements"
    Then I should be on "/engagements"

  Scenario: test Affinity Groups link
    Given I am not logged in
    When I am on the homepage
    When I follow "Affinity Groups"
    Then I should be on "/affinity_groups"

  Scenario: test CSSN link
    Given I am not logged in
    When I am on the homepage
    When I follow "CSSN"
    Then I should be on "/cssn"

  Scenario: test Events link
    Given I am not logged in
    When I am on the homepage
    When I follow "Events"
    Then I should be on "/events"

  Scenario: test News link
    Given I am not logged in
    When I am on the homepage
    When I follow "News"
    Then I should be on "/news/"

  Scenario: test Outages link
    Given I am not logged in
    When I am on the homepage
    When I follow "Outages"
    Then I should be on "/outages"

  Scenario: test My Engagements link
    Given I am not logged in
    When I am on the homepage
    When I follow "My Engagements"
    Then I should be on "/my-engagements"
