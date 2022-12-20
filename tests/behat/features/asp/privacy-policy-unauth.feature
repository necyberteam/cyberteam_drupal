@asp
@api
@javascript

Feature: test ACCESS Support Privacy Policy Page
  In order to test the Privacy Policy Page

  Scenario: Unauthenticated user tests the Privacy Policy Page
    Given I am not logged in
    When I go to "/privacy-policy"
    Then I should see "Privacy Policy"
    Then I should see "ACCESS InCommon Identity Provider"
    Then I should see "The ACCESS InCommon Identity Provider (IdP) at idp.access-ci.org allows ACCESS"
