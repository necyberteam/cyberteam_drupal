@asp
@api
@javascript

Feature: test ACCESS Support Announcements Page
  In order to test the Announcements Page

  Scenario: Unauthenticated user tests the Announcements Page
    Given I am not logged in
    When I go to "/announcements"
    Then I should see "Announcements"
    Then I should see "ACCESS Pegasus – Hosted Workflow Environment with HTCondor Annex"
    Then I should see "9/28/2022"
    Then I should see "Pegasus is now part of the ACCESS"
    Then I should see "On September 1st, the XSEDE project transitioned"
    Then I should see "Read more"
    Then I should see "Posting Announcements"
    Then I should see "Add Announcement"
    When I select "Delta" from "field_affinity_group_target_id"
    When I press "edit-submit-access-news--2"
    And I wait 10 seconds
    Then I should see "NCSA DELTA to Enter Production"
    When I click "Add Announcement"
    Then I should be on "/user/login?destination=/node/add/access_news"


    Scenario: Unauthenticated user tests a individual Announcement Page
    Given I am not logged in
    When I go to "/node/354"
    Then I should see "NCSA DELTA to Enter Production"
    Then I should see "09-12-2022"
    Then I should see "Tags"
    Then I should see "ACCESS RPs"
    Then I should see "Affinity Group"
    When I click "DELTA"
    Then I should be on "/affinity-groups/delta"
    When I go to "/node/354"
    When I click "< Back to Announcements"
    Then I should be on "/news"
