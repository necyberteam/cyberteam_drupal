@champ
@api
@javascript

Feature: test for the front page

  Scenario: Test the front page
    Given I am not logged in
    When I am on the homepage
    Then I should see an image with alt text "Campus Champions"
    Then I should see "Collaboratively employing advanced computing and data to tackle society's grand challenges"
    #Is there a better way to test the stats?
    Then I should see "Champions Nationionwide"
    Then I should see "Institutions Represented"
    Then I should see "Institutions in EPSCoR States"
    Then I should see "Minority Serving Institutions"
    #Youtube video is not working
    #Then I should see "Campus Champions Celebrate 10 Years"
    Then I should see "A Community of Practice"
    Then I should see "Scientific Computing Advocates"
    Then I should see "Cyberinfrastructure Professionals"
    Then I should see "Mentors, Peers, Students"
    Then I should see "Quick Links"
    Then I should see "Join the Champions"
    Then I should see "All Champions"
    Then I should see "Affinity Groups"
    Then I should see "Connect to Slack"
    Then I should see "Tags"
    Then I should see "Top Used"
    Then I should see "Least Used"
    Then I should see "All tags"
    Then I should see "Get Help"
    Then I should see "Ask a Question"
    Then I should see "Enter a Ticket"
    Then I should see "Find a Learning Resource"
    Then I should see "FInd Expert by Tag"
    Then I should see "Community Events"
    #No Evnts Shown
    #Then I should see "Data-Facing Events"
   #Then I should see "Researcher-Facing Events"
    #Then I should see "Systems-Facing Events"
    Then I should see "Jobs"
    Then I should see "More Jobs"
    #Does not show this
    #Then I should see "“Site under development”"
