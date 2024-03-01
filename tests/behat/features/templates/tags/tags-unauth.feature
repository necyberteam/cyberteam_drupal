@templates
@api
@javascript

Feature: Tests for the Tags page with unauthenticated user.  Verify "Request Tag"
  button is not shown, a particular tag links to its page, search is case insensitive.

    Scenario: Tags pages for unauthenticated user
      Given I am not logged in
      When I go to "tags"
      Then I should see "Tags"
      And I should see "Search"
      And I should see "login"
      And I should see "osg"
      And I should see "ACCESS Resources"
      And I should see "xsede"

    Scenario: Tags pages does not show "Request Tag" when logged out
      Given I am not logged in
      When I go to "tags"
      Then I should not see "Request Tag"

    Scenario: Unauthenticated user searches for tags (case insensitive)
      Given I am not logged in
      When I go to "tags"
      When I fill in "Search" with "login"
      Then I should see "login"
      When I fill in "Search" with "LOGIN"
      Then I should see "login"
      When I fill in "Search" with "LOGIN"
      Then I should see "login"
      When I follow "login"
      Then I should be on "tags/login"
      And I should see "Blog Entries"

