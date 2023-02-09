@asp
@api
@javascript

Feature: test ACCESS Support Community Page
  In order to test the Community Page

  Scenario: Unauthenticated user tests the Community Page
    Given I am not logged in
    When I go to "/cssn"
    Then I should see "Engage with other researchers"
    Then I should see "Computational Science & Support Network"
    Then I should see "Collaborate with the CSSN Community"
    Then I should see "The Computational Science and Support Network (CSSN) program"
    Then I should see "Share Knowledge"
    Then I should see "Exchange ideas and help solve problems"
    Then I should see "Build Relationships"
    Then I should see "Develop, advocate for, and advance"
    Then I should see "Mentor Students"
    Then I should see "Interactively share computing"
    Then I should see "Be a Consultant"
    Then I should see "Opportunities for active and up-"
    When I click "Join the CSSN Network"
    Then I should be on "/user/login?destination=/form/join-the-cssn-network"