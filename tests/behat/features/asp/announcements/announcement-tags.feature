@asp
@api
@javascript

Feature: test ACCESS Support Tags Page
  In order to test the Tags Page

  Scenario: Unauthenticated user tests the Tags page and verifies one of the Announcements
    Given I am not logged in
    When I go to "/tags/science-gateway"
    And I wait 4 seconds
    Then I should see "Announcements"
    Then I should see "Title"
    Then I should see "Gateways 2023 Call for Participation"
    Then I should see "Date"
    Then I should see "04/13/2023"
    Then I should see "Tags"
    Then I should see "science gateway"
    Then I should see "Affinity Group"
    Then I should see "Upcoming Events"
    Then I should see "Gateways 2023"
    Then I should see "10/30/2023"
    Then I should see "1:00 PM EDT - 4:00 PM EDT"

  Scenario: Authenticated user tests creates two announcements to test and then creats a third to test more feature.
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/access_news"
    When I fill in "Title" with "Test"
    # TODO - can't access body field, ticket:  https://cyberteamportal.atlassian.net/browse/D8-1774
    # When I fill in "Body" with "Test-body"
    When I fill in "Affinity Group" with "ACCESS Support (327)"
    When I fill in "Tag" with "login (682)"
    When I select "Published" from "Save as"
    When I press "Save"
    When I go to "/node/add/access_news"
    When I fill in "Title" with "Test2"
    # TODO - can't access body field, ticket:  https://cyberteamportal.atlassian.net/browse/D8-1774
    #When I fill in "Body" with "Test2-body"
    When I fill in "Affinity Group" with "ACCESS Facilitators (188)"
    When I fill in "Tag" with "login (682)"
    When I select "Published" from "Save as"
    When I press "Save"
    And I wait 4 seconds
    When I go to "/tags/login"
    Then I should see "News"
    Then I should see "Title"
    Then I should see "test"
    Then I should see "Date"
    Then I should see "Tags"
    Then I should see "login"
    Then I should see "Affinity Group"
    Then I should see "ACCESS Facilitators"
    Then I should see "Test2"
    Then I should see "ACCESS Support"
    When I go to "/node/add/access_news"
    When I fill in "Title" with "Test3"
    #When I fill in "Body" with "Test3"
    When I fill in "Affinity Group" with "ACCESS RP Integration (402)"
    When I fill in "Tag" with "login (682)"
    When I select "Published" from "Save as"
    When I press "Save"
    When I go to "/node/add/access_news"
    When I fill in "Title" with "Test4"
    #When I fill in "Body" with "Test4"
    When I fill in "Affinity Group" with "Access Support Testing (413)"
    When I fill in "Tag" with "login (682)"
    When I select "Published" from "Save as"
    When I press "Save"
    When I go to "/tags/login"
    When I click "more"
    Then I should see "News"
    Then I should see "Test3"
    Then I should see "ACCESS RP Integration"

  Scenario: Unauthenticated user tests the Term selector on the Announcements Page
    Given I am not logged in
    When I go to "/announcements"
    Then I should see "Term"
    #edit-tid--2 is the Term selector
    When I select "science gateway" from "edit-tid--2"
    #edit-submit-access-news--2 is the Apply button
    When I press "edit-submit-access-news--2"
    And I wait 4 seconds
    Then I should see "Gateways 2023"