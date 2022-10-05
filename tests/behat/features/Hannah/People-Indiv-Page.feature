@templates
@api
@javascript
Feature: test individual people page 
  In order to test the individual people page

  Scenario: Unauthenticated user tests the individual people page
    Given I am not logged in
    When I go to "people/List"

    When I fill in "Search by Name" with "Julie Ma"
    And I wait 4 seconds
    Then I should see "Julie Ma"
    When I click "Julie" 

    Then I should see "Julie Ma "
    Then I should see "MGHPCC"
    Then I should see "mentor"
    Then I should see "Skills"
    Then I should see "Affinity Groups"

    #Projects section does not show in testing
    #Then I should see "Projects"

    

    Then I should not see "HPC Experience"
    Then I should not see "Interest"
    #It reads the Contact Us at the footer
    #Then I should not see "Contact" 

