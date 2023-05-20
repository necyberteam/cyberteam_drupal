@asp
@api
@javascript

Feature: test ACCESS Support Community Page
  In order to test the Community Page

  Scenario: Unauthenticated user tests the Community Page
    Given I am not logged in
    When I go to "/cssn"
    And I wait for the page to be loaded
    Then I should see "Engage with other researchers"
    Then I should see "Computational Science & Support Network"
    Then I should see "Join the CSSN Community"
    Then I should see "The Computational Science and Support Network (CSSN) makes us all stronger "
    Then I should see "Knowledge & Relationships"
    Then I should see "Community of Practice to advance campus research computing"
    Then I should see "Mentor Students"
    Then I should see "Interactively share computing"
    Then I should see "Be a Consultant"
    Then I should see "Opportunities for active and up-"
    Then I should see "CCEP Travel Money"
    Then I should see "Travel support for your contributions to the community"
    # TODO not found on github - miles fixing pullfiles, should fix this
    # Then I should see an image with alt text "Airplane"
    Then I should see "CCEP Travel Grants and Rewards for your Contributions"
    Then I should see "The CSSN Community Engagement Program (CCEP) is accepting"
    When I click "Join the CSSN"
    And I wait 4 seconds
    #Then I should be on "cssn"
    #Link seems to be broken this should lead to "/user/login" but it stays on"cssn"
    Then I should be on "/user/login"

    When I go to "/cssn"
    And I click "FIND OUT MORE"
    And I wait for the page to be loaded
    Then I should be on "/ccep-pilot"


  # TODO enable when authenticated is possible on ASP.
  # (and rename this filename to just "community.feature" or "cssn.feature")
  # Scenario: Authenticated user tests the Community Page
  #   Given I am logged in as a user with the "authenticated" role
  #   When I go to "/cssn"
  #   When I click "Join the CSSN Network"
  #   Then I should be on "/user/login"
  #
  #   When I go to "/cssn"
  #   And I click "FIND OUT MORE"
  #   Then I should be on "/ccep-pilot"


