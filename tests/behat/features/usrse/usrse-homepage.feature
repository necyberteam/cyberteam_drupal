@usrse
@api
@javascript

Feature: verify specific links on homepage

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/usrse"
    And I should see "USRSE"

  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "USRSE"
    Then I should be on the homepage

  Scenario: authenticated User is on the homepage
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/usrse"
    And I should see "USRSE"

  Scenario: authenticated Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "USRSE"
    Then I should be on the homepage
