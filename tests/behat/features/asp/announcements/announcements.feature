@asp
@api
@javascript

Feature: The Announcements Page displays a title "Announcements" and lists
  announcements with titles and "Read more" buttons linking to their respective stories.
  The filter by Affinity Group works as expected, and a "Posting Announcement" box appears
  under the filter. For adding announcements, there's an "Add Announcement" button that directs
  users to a form, with anonymous users required to log in first.

  An announcement should display:
  - Title
  - Date
  - Description
  - Tags
  - Affinity Group
  - A link back to the announcements list

  TODO: authenticated user should be able to edit their own announcement
  TODO: match_pm should be able able edit announcements

  Scenario: Anonymous user tests the Announcements Page
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


  Scenario: Anonymous user tests a individual Announcement Page
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
    Then I should be on "/announcements"
    When I click "Add Announcement"
    Then I should be on "/user/login?destination=/node/add/access_news"


 Scenario: Authenticated user tests the Announcements Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/announcements"
    Then I should see "Announcements"
    Then I should see "PEARC Steering Committee Accepting Nominations"
    Then I should see "6/08/2023"


 Scenario: Authenticated user tests a individual Announcement Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/node/354"
    Then I should see "NCSA DELTA to Enter Production 9/19/2022"
    Then I should see "09-12-2022"
    Then I should see "We are happy to announce that the National Science"
    Then I should see "ACCESS RPs"
    Then I should see "DELTA"
    Then I should see "< Back to Announcements"
