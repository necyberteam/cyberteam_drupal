@champ
@api
Feature: test for the affinity groups page

  Scenario: User runs through the affinity group page and individual page.
    Given I am not logged in
    When I go to "/affinity-groups"
    Then I should see "affinity groups"
    Then I should see "Logo"
    Then I should see "Affinity Group"
    Then I should see "Description"
    Then I should see "Tags"
    Then I should see "Join"
    Then I should see "Request An Affinity Group"
    When I go to "/affinity-groups/cloud-computing"
    Then I should see "Members get updates"
    Then I should see "Cloud Computing"
    Then I should see "cloud-commercial"
    Then I should see "People who use or are considering"
    Then I should see "Join"
    Then I should see "Join On Slack"
    Then I should see "Visit Q&A Platform"
    Then I should see "Mailing List"
    Then I should see "Coordinators"
    Then I should see "Events"
    Then I should see "Resources"
    Then I should see "News"
    Then I should see "People"


