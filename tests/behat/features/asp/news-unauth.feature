@asp
@api
@javascript

Feature: test ACCESS Support News Page
  In order to test the News Page

  Scenario: Unauthenticated user tests the News Page
    Given I am not logged in
    When I go to "/news"
    Then I should see "News"
    Then I should see "ACCESS Pegasus – Hosted Workflow Environment with HTCondor Annex"
    Then I should see "9/28/2022"
    Then I should see "Pegasus is now part of the ACCESS"
    Then I should see "On September 1st, the XSEDE project transitioned"
    Then I should see "Read more"
    Then I should see "Posting News"
    Then I should see "Add News"
    When I select "Delta" from "field_affinity_group_target_id"
    #TODO APPLY Button is not working
    #When I click "edit-submit-access-news--2"
    #And I wait 10 seconds
    When I click "Add News"
    Then I should be on "/user/login?destination=/node/add/access_news"


    Scenario: Unauthenticated user tests a individual News Page
    Then I should see ""
    Then I should see ""
    Then I should see ""
    Then I should see ""
    Then I should see ""
    Then I should see ""
    Then I should see ""
    Then I should see ""
    Then I should see ""