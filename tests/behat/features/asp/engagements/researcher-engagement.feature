@asp
@api
@javascript

Feature: testing match engagements submissions for researcher role

  Scenario: Admin with researcher role test match engagements submissions page
    Given I am logged in as a user with the "researcher" role
    When I go to "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test"
    When I fill in "Institution" with "Test"
    When I select "Start as soon as possible" from "Urgency"
    #Description is not testible
    #When I fill in "edit-body-wrapper" with "Test"
    When I press "Save"

