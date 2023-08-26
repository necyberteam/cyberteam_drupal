@asp
@api
@javascript

Feature: This behat tests the The Community Page features which offers
a sub-title "Engage with other researchers" and a page title
"Computational Science & Support Network." Under the heading
"Collaborate with the CSSN Community," there are four icons with
descriptions, including "Share Knowledge," "Build Relationships,"
"Mentor Students," and "Be a Consultant." The page also includes
a button "Join the CSSN Network," which links to the login page.

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
    And I wait 8 seconds
    Then I should be on "/user/login?destination=/form/join-the-cssn-network"

    When I go to "/cssn"
    And I click "FIND OUT MORE"
    And I wait for the page to be loaded
    #Then I should be on "/ccep-pilot"



  Scenario: Authenticated user tests the Community Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/cssn"
    When I click "Join the CSSN"
    Then I should be on "/form/join-the-cssn-network"
    When I go to "/cssn"
    And I click "FIND OUT MORE"
    Then I should be on "/ccep-pilot"


