@asp
@api
@javascript

Feature: test ACCESS Support MATCHPremier Indivdual Engagement Page

  Scenario: Unauthenticated user tests the MATCHPremier Indivdual Engagement Page
    Given I am not logged in
    When I go to "/engagements"
    Then I should see "MATCHPremier Engagements"
    Then I should see "Developing Computational Labs for Upper Level Physical Chemistry II Course"
    When I follow "Developing Computational Labs for Upper Level Physical Chemistry II Course"
    Then I should be on "/node/330"
    Then I should see "Developing Computational Labs for Upper Level Physical Chemistry II Course"
    Then I should see "Institution"
    Then I should see "Status"
    Then I should see "Out of all the upper level chemistry courses"
    # testing Right Column
    Then the image url "https://support.access-ci.org/sites/default/files/styles/access_match_sidebar/public/match_engagement/2022-08/BSU5_4_0_0.png?itok=dPwiMeMl" should load
    #TODO: test Consultant name appears
