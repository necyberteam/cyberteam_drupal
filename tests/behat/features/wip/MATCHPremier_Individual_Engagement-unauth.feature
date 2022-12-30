@wip
@api
@javascript

Feature: test ACCESS Support MATCHPremier Indivdual Engagement Page

  Scenario: Unauthenticated user tests the MATCHPremier Indivdual Engagement Page
    Given I am not logged in
    When I go to "/engagements"
    Then I should see "MATCHPremier Engagements"
    When I follow "Statistical Analysis of criminal cases in the United States District Court of Puerto Rico"
    Then I should be on "/node/335"
    Then I should see "Statistical Analysis of criminal cases in the United States District Court of Puerto Rico"
    Then I should see "Institution"
    Then I should see "Status"
    Then I should see "For the purposes of submitting an amicus brief to the US"
    #testing Right Column
    #Then the image at “img[src=https://test-accessmatch.pantheonsite.io/sites/default/files/styles/access_match_sidebar/public/match_engagement/2022-08/iStock-1221293664-1.jpg?itok=mzi6hWIV]” should load

#TODO: test Consultant name appears
