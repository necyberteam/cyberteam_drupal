@asp
@api
@javascript

Feature: test join-the-cssn-network webform

  Scenario: Authenticated user tests of the join-the-cssn-network webform
    Given I am logged in as a user with the "authenticated" role
    When I go to "/form/join-the-cssn-network"
    Then I should see "How would you like to participate in the CSSN?"
    Then I should see "General Member"
    Then I should see "Student-Facilitator"
    Then I should see "Premier Consultant"
    Then I should see "MATCHPlus Mentor"
    Then I should see "NSF-funded CIP"

    When I check "MATCHPlus Mentor"
    When I press "Submit"
    And I wait 2 seconds
    Then I should see "Submission updated in Join the CSSN Network."
