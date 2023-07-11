@templates
@api
@javascript

Feature: test tags form
  In order to test the tags form
  As a user of the authenticated role

  Scenario: Authenticated user fills out the tags form
    Given I am logged in as a user with the "authenticated" role
    When I go to "tags"
    When I follow "Request Tag"
    Then I should be on "form/request-tag"
    And I should see "Request Tag"
    And I should see "Tag Request Name"
    And I should see "Suggested Parent Tag"
    When I fill in "Tag Request Name" with "TEST"
    # this specifies ACCESS RPs as the parent
    When I select "684" from "Suggested Parent Tag"
    And I wait 2 seconds
    When I press "Submit"
    Then I should see "Your request has been submitted! Thank you! We will add your tag soon. Please check back shortly to use your new tag."
