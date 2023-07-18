@asp
@api
@javascript

Feature: test ACCESS Support Match Plus Page
  In order to test the Match Plus Page

  Scenario: Unauthenticated user tests the Match Plus Page
    Given I am not logged in
    When I go to "/matchplus"
    Then I should see "Short-term support partnerships"
    Then I should see "MATCHPlus"
    Then I should see "Ten Engagement Pilot"
    Then I should see "Direct Support for Researchers"
    Then I should see "Get help with improvements like expanding your code"
    Then I should see "MATCHPlus provides support to researchers through short-term"
    #TODO TEST IMAGES ONCE TAG IS ADDED
    Then I should see "3-6 Month Engagements"
    Then I should see "Mentor/Student Team"
    Then I should see "No Cost"
    Then I should see "Leverage CSSN Expertise"
    Then I should see "The MATCHPlus Process"
    Then I should see "Researchers define the research need via the engagement request form,"
    Then I should see "Researcher (PI) recognizes"
    Then I should see "MATCHPlus matches a mentor"
    Then I should see "Student facilitator carries out the project"
    Then I should see "Research moves forward."
    #TODO: test 4 number icons ^
    Then I should see "Interested in Joining the Pilot?"
    Then I should see "MATCHPlus will be selecting up to ten projects to launch between"
    Then I should see "Apply for MATCHPlus"
    Then I should see "Receive expert CSSN research support"
    Then I should see "Collaborate with a mentor/student pairing"
    Then I should see "Collaborate with a mentor/student pairing"
    Then I should see "Benefit from support dedicated to advancing your"
    When I click "Request a Pilot Engagement"
    Then I should be on "/user/login?destination=/node/add/match_engagement%3Ftype%3Dplus"
    When I go to "/matchplus"
    Then I should see "Join our Mentors"
    Then I should see "Leverage your expertise"
    Then I should see "Mentor a student research facilitator"
    Then I should see "Help advance scientific breakthroughs"
    Then I should see "Help drive evolving and emerging research"
    When I click "Become a Mentor"
    Then I should be on "/user/login?destination=/form/join-the-cssn-network"
    When I go to "/matchplus"
    Then I should see "Be a Student-Facilitator"
    Then I should see "Gain cutting-edge research experience"
    Then I should see "Work with a CSSN mentor and expert"
    Then I should see "Help drive scientific research"
    Then I should see "Showcase your expertise,"
    When I click "Join MATCHPlus"
    Then I should be on "/user/login?destination=/form/join-the-cssn-network"
    When I go to "/matchplus"
    Then I should see "Fill out our online form"

  Scenario: Unauthenticated user tests the Match Plus Page Sample Engagement Section
    Given I am not logged in
    When I go to "/matchplus"
    Then I should see "Featured MATCHPlus Engagements"
    #Testing of engagment names seems to not stay consistent
    #Then I should see "GPU-accelerated ice sheet flow modeling"
    #Then I should see "University of North Dakota"
    #When I click "+ More"
    When I click "See All"
    Then I should be on "/engagements"
    Then I should see "MATCH Engagements"
    Then I should see "MATCHPlus Engagements"
    #Then I should see "GPU-accelerated ice sheet flow modeling"
    When I click "GPU-accelerated ice sheet flow modeling"
    Then I should be on "/node/412"
    Then I should see "GPU-accelerated ice sheet flow modeling"
    Then I should see "Institution"
    Then I should see "University of North Dakota"
    Then I should see "Status"
    Then I should see "Recruiting"
    Then I should see "Sea levels are rising"
    #Then I should see "Student"
    #Then I should see "Mentor"
    #Then I should see "Tags"
    # testing tags on /node/412
    Then I should see "matlab"
    Then I should see "cuda"

