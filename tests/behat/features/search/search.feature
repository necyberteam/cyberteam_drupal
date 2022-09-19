@search
@api
Feature: test site search field
  Testing that the search field appears on the site

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    When I fill in "Search" with "asdf"
    When I press "Search"
    Then I should see "asdf"

