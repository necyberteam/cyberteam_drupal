@templates
@api
@javascript

Feature: Verify the main icon loads

  Scenario: Verify the main icon loads
    When I am on the homepage
    Then the image at ".navbar-brand" should load
