@asp
@api
@javascript

Feature: test ACCESS Support MATCHPremier Page
  This Behat test checks the /matchplus page for the appearance of page sub-titles,
  titles, and specific sections like The MATCHPremier Process, Funding,
  Interested in Joining, etc.
  It checks for three Sample Engagements appear at the bottom of the page, that
  titles link to Engagements.
  Tests that some buttons take user to login page.

  Scenario: Unauthenticated user tests the MATCHPremier Page
    Given I am not logged in
    When I go to "/matchpremier"
    Then I should see "Long-term embedded specialists"
    Then I should see "MATCHPremier"
    Then I should see "TEN ENGAGEMENT PILOT"
    Then I should see "Does your Project Need More Support?"
    Then I should see "Get embedded support from one or more MATCHPremier Consultants for 12 - 18 months."
#TODO: test Four icons with labels
    Then I should see "The MATCHPremier Process"
    Then I should see "Researchers define the research need, required skill sets, deliverables and a set of milestones via the engagement request form."
#TODO: test Four number icons with labels
    Then I should see "Funding your MATCHPremier Engagement"
    Then I should see "MATCHPremier engagements provide researchers with consultants to support their research,"
    When I am on "/matchpremier"
    When I follow "Find out More"
    Then I should be on "/user/login?destination=/form/proposal-support"
    When I am on "/matchpremier"
    Then I should see "Interested in Joining the Pilot?"
    Then I should see "MATCHPremier will be selecting up to ten projects to launch between September,"

    # test Three sections with cta's.
    Then I should see "Request an Engagement"
    Then I should see "Get Help with Funding"
    Then I should see "Join our MATCHPremier CSSN Team"
    Then I should see "Connect with expert CSSN Consultants"
    Then I should see "Search Grants"
    Then I should see "Leverage your subject matter expertise"
    When I am on "/matchpremier"
    When I follow "Request a Pilot Engagement"
    Then I should be on "/user/login?destination=/node/add/match_engagement%3Ftype%3Dpremier"

    When I am on "/matchpremier"
    When I follow "Get Proposal Support"
    Then I should be on "/user/login?destination=/form/proposal-support"

    When I am on "/matchpremier"
    When I follow "Become a Consultant"

    Then I should be on "/user/login?destination=/form/join-the-cssn-network"
    When I am on "/matchpremier"
    Then I should see "Sample Engagements from the Northeast and CAREERS Cyberteams"

    # testing Three Sample Engagements appear at the bottom of the page
    #Then the image at “img[src=/sites/default/files/styles/landscape/public/match_engagement/2022-08/katies-project_0.png?itok=9zZJB_92]” should load
    #Then I should see "Optimization and Parallelization of A Numerical Gravitational-Wave Model"
    #Then the image at "img[src=/sites/default/files/styles/landscape/public/match_engagement/2022-08/iStock-1221293664-1.jpg?itok=3mUylptK]" should load
    #Then I should see "Statistical Analysis of criminal cases in the United States District Court of Puerto Rico"
    #Then the image at "img[src=/sites/default/files/styles/landscape/public/match_engagement/2022-08/UVM_Art_AI_Initiative_May2020_1.png?itok=XIl-29BO]" should load
    #Then I should see "UVM Art and AI Initiative"

    # testing Titles link to Engagements
    When I am on "/matchpremier"
    When I follow "Developing Computational Labs for Upper Level Physical Chemistry II Course"
    Then I should be on "/node/330"


#TODO: test More buttons expand box to reveal whole excerpt and "- Less" link

    # testing tags in box and tag link

    #When I am on "/matchpremier"
    #Given I click the ".view-match-engagement-view .view-content .col:first-of-type .more-match" element
    #Then I should see "big-data"
    #Then I should be on "/tags/big-data"
    #When I am on "/matchpremier"
    #Given I click the ".view-match-engagement-view .view-content .col:first-of-type .more-match" element
    #Then I should see "big-data"
    #When I click "- Less"


#TODO: test -Less link collapse box

    # testing A button is shown to see all engagements
    When I am on "/matchpremier"
    When I follow "See All"
    Then I should be on "/engagements"