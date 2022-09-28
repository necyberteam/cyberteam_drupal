@nect
@api
Feature: test footer
  In order to test the footer

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see "Funded in part by the National Science Foundation"
    And I should see "Copyright"
    And I should see "All Rights Reserved"
    And I should see "Connect.CI"
    And I should see "Contact Us"
    When I follow "Connect.CI"
    # TODO - broken - fix this:
    #Then I should be on "regions"
    When I follow "Contact Us"
    # TODO - broken - fix this:
    Then I should be on "contact/northeast_cyberteam"