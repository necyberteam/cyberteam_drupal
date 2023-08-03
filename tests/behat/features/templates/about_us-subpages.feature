@templates
@api
@javascript

Feature: both unauthenticated and authenticated 
users tests About Us menu subpages

  Scenario: unauthenticated user test About Us menu subpages
    Given I am not logged in
    When I am on "about-us/user-guide"
    Then I should see "Welcome to the Cyberteam Portal Users Guide!"
    When I am on "about-us/affinity-groups-faq"
    Then I should see "Affinity Groups encourage community members to gather"
    When I am on "code-conduct"
    Then I should see "ACCESS welcomes and encourages participation in our community by people of all backgrounds and identities"
    When I am on "news"
    Then I should see "Published Articles"
    Then I should see "News"

    Scenario: authenticated user tests About Us menu subpages
    Given I am not logged in with the "authenticated" role
    When I am on "about-us/user-guide"
    Then I should see "Welcome to the Cyberteam Portal Users Guide!"
    When I am on "about-us/affinity-groups-faq"
    Then I should see "Affinity Groups encourage community members to gather"
    When I am on "code-conduct"
    Then I should see "ACCESS welcomes and encourages participation in our community by people of all backgrounds and identities"
    When I am on "news"
    Then I should see "Published Articles"
    Then I should see "News"

