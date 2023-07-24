@templates--DISABLED_BROKEN
@api
@javascript
Feature: test individual people page
  In order to test the individual people page

  Scenario: Authenticated user tests the individual people page
    Given I am logged in as a user with the "authenticated" role
    When I go to "people/List"
    When I fill in "Search by Name" with "Julie Ma"
    And I wait 4 seconds
    Then I should see "Julie Ma"
    When I click "Julie"
    Then I should see "Julie Ma "
    #Image is not tested
    #Then I should see "img-fluid img-thumbnail w-100"
    Then I should see "MGHPCC"
    Then I should see "mentor"
    Then I should see "Skills"
    Then I should see "Affinity Groups"
    Then I should see "Contact"
    #Projects is not shown in screenshots or on actual page
    #Then I should see "Projects"
    Then I should not see "HPC Experience"
    Then I should see "Interest"
    Then I should see "aws"
    Then I should see "azure"
    When I click "Contact"
    Then I should be on "/user/100/contact"


    #Scenario: Authenticated user tests the user individual page
    #Given I am logged in as a user with the "authenticated" role
    #When I go to "people/List"
    #When I fill in "Search by Name" with "mrfYEeUO"
    #And I wait 4 seconds
   # Then I should see "mrfYEeUO"
   #User test name cannot be identified


