@asp
@api
@javascript

Feature: test ACCESS Support Navigation Bar
  In order to test the Navigation Bar

  Scenario: Unauthenticated user tests the Navigation Bar
    Given I am not logged in
    When I am on the homepage
    Then I should see "Tools"
    Then I should see "Knowledge Base"
    Then I should see "MatchPlus"
    Then I should see "MatchPremier"
    Then I should see "Community"

Scenario: Unauthenticated user tests the Footer Navigation Bar
    Given I am not logged in
    When I am on the homepage
    Then I should see "Tools"
    Then I should see "OnDemand"
    Then I should see "Pegasus"
    Then I should see "Science Gateways"
    Then I should see "XDMoD"
    Then I should see "Knowledge Base"
    Then I should see "Documentation"
    Then I should see "Q&A Forum"
    Then I should see "Resources"
    Then I should see "Match"
    Then I should see "MatchPlus"
    Then I should see "MatchPremier"
    Then I should see "Engagements"
    Then I should see "Community"
    Then I should see "Affinity Groups"
    Then I should see "CSSN"
    Then I should see "Events"
    Then I should see "News"
    Then I should see "Outages"
    Then I should see "My Engagements"
    Then I should see "Acceptable Use"
    Then I should see "Code of Conduct"
    Then I should see "Privacy Policy"
    #Test for the ACCESS logo at footer
    #Then I should see "/themes/custom/accesstheme/assets/ACCS050322_ACCESS_Brand_Tagline-RGB.png"



Scenario: Unauthenticated user tests the NSF Section
    Given I am not logged in
    When I am on the homepage
    #Test the image
    #Then I should see "/themes/custom/accesstheme/assets/NSF_4-Color_bitmap_Logo_350x350.png"
    Then I should see "National Science Foundation"
    Then I should see "ACCESS is an advanced computing and data resource supported by the National Science Foundation and made possible through these lead institutions and their partners"
    Then I should see "Carnegie Mellon University"
    Then I should see "University of Colorado Boulder"
    Then I should see "University of Illinois at Urbana-Champaign"
    Then I should see "State University of New York at Buffalo"

    # TODO?
    #Test for social links
    #Then I should see "social-link"
