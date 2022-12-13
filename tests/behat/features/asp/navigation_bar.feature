@asp
@api
@javascript

Feature: test Navigation Bar

  Scenario: test MATCHPlus link
    Given I am not logged in
    When I am on the homepage
    When I follow "MATCHPlus"
    Then I should be on "https://support.access-ci.org/matchplus"

  Scenario: test MATCHPremier link
    Given I am not logged in
    When I am on the homepage
    When I follow "MATCHPremier"
    Then I should be on "https://support.access-ci.org/matchpremier"

