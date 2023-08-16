@asp
@api
@javascript

Feature: The Privacy Policy Page displays the title "Privacy Policy"
and is accessible to unauthenticated users.

  Scenario: Unauthenticated user tests the Privacy Policy Page
    Given I am not logged in
    When I go to "/privacy-policy"
    Then I should see "Privacy Policy"
    Then I should see "ACCESS InCommon Identity Provider"
    Then I should see "The ACCESS InCommon Identity Provider (IdP) at idp.access-ci.org allows ACCESS"
