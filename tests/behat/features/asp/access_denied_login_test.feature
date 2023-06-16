@asp
@api
@javascript

Feature: test login function for access denied error

  Scenario: Logging into the Access support website
    Given I am not logged in
    When I am on the homepage
    When I follow "Log in with ACCESS CI"
    When I follow "Log On"
    And I fill "ACCESS Username" with "abrush"
    And I fill "ACCESS Password" with "Access2023"
    When I follow "Login"
    Then I should not see "Access Denied"







