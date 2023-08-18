@asp
@api
@javascript

Feature: test Navigation Bar
  For unauthenticted user, verify the MATCHPlus and MATCHPremier links
  TODO: verify tools menu, knowledge base menu, and community menu items
  TODO: add test for authenticated user too

  Scenario: test MATCHPlus link
    Given I am not logged in
    When I am on the homepage
    When I follow "MATCHPlus"
    Then I should be on "/matchplus"

  Scenario: test MATCHPremier link
    Given I am not logged in
    When I am on the homepage
    When I follow "MATCHPremier"
    Then I should be on "/matchpremier"

