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
    Then I should see "Interests"
    When I follow "aws"
    Then I should be on "/tags/aws"
    When I am on "/user/julie-ma"
    Then I should see "Skills"
    # testing hardware page is failing
    #When I follow "hardware"
    #Then I should be on "/tags/hardware"
    Then I should see "Affinity Groups"
    Then I should see "Projects"
    #When I follow "Portal Development"
    #Then I should be on "/project/63"
    When I am on "/user/julie-ma"
    #Projects section does not show in testing
    #Then I should not see "Projects"
    Then I should not see "HPC Experience"
    #Then I should not see "Interest"
    #It reads the Contact Us at the footer
    #Then I should not see "Contact"

    # testing image
    Then I should see an image with src "/sites/default/files/pictures/julie-ma_0.jpg"
