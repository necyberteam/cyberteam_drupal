@asp
@api
@javascript

Feature: test Navigation Bar footer

  Scenario: Unauthenticated user tests footer links OnDemand link
    Given I am not logged in
    When I am on the homepage
    When I follow "OnDemand"
    Then I should be on "/ondemand"

    When I am on the homepage
    When I follow "Pegasus"
    Then I should be on "/pegasus"

    When I am on the homepage
    When I follow "Science Gateways"
    Then I should be on "/tools/science-gateways"

    When I am on the homepage
    When I follow "XDMoD"
    Then I should be on "/xdmod"

    When I am on the homepage
    When I follow "Knowledge Base"
    Then I should be on "/knowledge-base"

    When I am on the homepage
    When I follow "Documentation"
    Then I should be on "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/overview"

    When I am on the homepage
    And I wait 2 seconds
    When I follow "Q&A Forum"
    Then I should be on "https://ask.cyberinfrastructure.org/"

    When I am on the homepage
    When I follow "CI Links"
    Then I should be on "/ci-links"

    When I am on the homepage
    When I follow "MATCHPlus"
    Then I should be on "/matchplus"

    When I am on the homepage
    When I follow "MATCHPremier"
    Then I should be on "/matchpremier"

    When I am on the homepage
    When I follow "Engagements"
    Then I should be on "/engagements"

    When I am on the homepage
    When I follow "Affinity Groups"
    Then I should be on "/affinity_groups"

    When I am on the homepage
    When I follow "CSSN"
    Then I should be on "/cssn"

    When I am on the homepage
    When I follow "Events"
    Then I should be on "/events"


  Scenario: test Announcements link
    Given I am not logged in
    When I am on the homepage
    Given I click the ".footer-announcements-link" element
    Then I should be on "/announcements"

    When I am on the homepage
    When I follow "Outages"
    Then I should be on "/outages"

    When I am on the homepage
    When I follow "My Engagements"
    Then I should be on "/my-engagements"

  Scenario: Unauthenticated user tests the NSF Section
    Given I am not logged in
    When I am on the homepage
    Then I should see an image with alt text "National Science Foundation"
    Then I should see "National Science Foundation"
    Then I should see "ACCESS is an advanced computing and data resource supported by the National Science Foundation and made possible through these lead institutions and their partners"
    When I follow "National Science Foundation"
    Then I should be on "https://www.nsf.gov/"
    When I am on the homepage
    Then I should see "Carnegie Mellon University"
    When I follow "Carnegie Mellon University"
    Then I should be on "https://www.cmu.edu/"
    When I am on the homepage
    Then I should see "University of Colorado Boulder"
    When I follow "University of Colorado Boulder"
    Then I should be on "https://www.colorado.edu/"
    When I am on the homepage
    Then I should see "University of Illinois at Urbana-Champaign"
    When I follow "University of Illinois at Urbana-Champaign"
    Then I should be on "https://illinois.edu/"
    When I am on the homepage
    Then I should see "State University of New York at Buffalo"
    When I follow "State University of New York at Buffalo"
    Then I should be on "https://www.buffalo.edu/"

  #Scenario: Unauthenticated user tests social icons section
    #TODO: test social icons

  Scenario: Unauthenticated user tests the ACCESS logo link section
    Given I am not logged in
    When I am on the homepage
    Then I should see an image with alt text "ACCESS"
    When I follow "Acceptable Use"
    Then I should be on "https://identity.access-ci.org/aup.html"
    When I am on the homepage
    When I follow "Code of Conduct"
    Then I should be on "/code-of-conduct"
    When I am on the homepage
    When I follow "Privacy Policy"
    Then I should be on "/privacy-policy"




