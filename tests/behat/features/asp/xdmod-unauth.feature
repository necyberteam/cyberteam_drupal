@asp
@api
@javascript

Feature: The XDMoD page displays information about ACCESS XDMoD
  and is accessible to anonymous users.

  Scenario: Unauthenticated user tests the XDMoD Page
    Given I am not logged in
    When I go to "/xdmod"
    Then I should see "ACCESS XDMoD"
    Then I should see "ACCESS Monitoring and Measurement Services (MMS)"
    Then I should see "MMS provides the ACCESS XDMoD tool to explore,"
    When I click "Launch ACCESS XDMoD"
    Then I should be on "https://xdmod.access-ci.org/"
    When I go to "/xdmod"
    Then I should see an image with alt text "XDMoD for Researchers"
    Then I should see "For Researchers"
    Then I should see "View current and historical information regarding your CI usage"
    Then I should see "Learn More"
    Then I should see "For Resource Providers"
    Then I should see "Automatically find users and groups running inefficient jobs."
    Then I should see an image with alt text "XDMoD for Research Providers"
    Then I should see an image with alt text "XDMoD for Ci Community"
    Then I should see "For the CI community"
    Then I should see "Gain insight into national CI usage. Export data for research projects."
    When I click "Join Us"
    Then I should be on "https://metrics.access-ci.org/get_started/#data/"
