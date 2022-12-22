@asp
@api
@javascript


Feature: test ACCESS Support Engagements Page

  Scenario: Unauthenticated user tests the Engagements Page
    Given I am not logged in
    When I go to "https://support.access-ci.org/engagements"
    Then I should see "MATCHPlus Engagements"
    Then I should see "MATCHPremier Engagements"

    # testing Titles link to Engagements
    When I follow "Transient cooling of composite spherical moving droplet at high temperature with phase change and non-homogeneous boundary conditions"
    Then I should be on "https://support.access-ci.org/node/326"
    When I am on "https://support.access-ci.org/engagements"
    When I follow "Transient cooling of composite spherical moving droplet at high temperature with phase change and non-homogeneous boundary conditions"
    Then I should be on "https://support.access-ci.org/node/326"

#TODO: More buttons expand box to reveal whole excerpt and "- Less" link

    # testing tags in box and tag link
    Then I should see "bash"
    When I am on "https://support.access-ci.org/engagements"
    When I follow "bash"
    Then I should be on "https://support.access-ci.org/tags/bash"

#TODO: - Less link collapse box
