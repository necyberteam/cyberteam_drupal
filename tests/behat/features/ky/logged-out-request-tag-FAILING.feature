@ky
@api

Feature: logged out user does not see "Request Tag"

    Scenario: Tags pages does not show "Request Tag" when logged out
      Given I am not logged in
      When I go to "tags"
      # TODO - not working
      # Then I should not see "Request Tag"