@asp
@api
@javascript

Feature: test ACCESS Support Homepage
  In order to test the Homepage

  Scenario: Unauthenticated user tests the Homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see "Supporting the ACCESS Research Community"
    Then I should see "Get Help"
    Then I should see "What are you looking for?"
    Then I should see "Search the ACCESS Universe for answers by typing keywords or phrases. Search is an evolving feature and will improve with time."
    Then I should see "Browse the Documentation"
    #TODO How can I test the specific link?
    #Then I should see "/knowledge-base"
    Then I should see "Go to Knowledge Base"
    #TODO How can I test the image?
    #Then I should see "Woman with laptop"
    Then I should see "Engage With the Community"
    Then I should see "Join Affinity Groups"
    #TEST image
    Then I should see "Still need help? Open a Ticket"
    Then I should see "Create a Ticket"
    #TEST image
    Then I should see "MATCH Research Support"
    Then I should see "Longer term support engagement with expert consultants help you focus on your research and move science forward."
    #TEST Image
    Then I should see "MATCHPLUS"
    Then I should see "Short-term Support Partnerships"
    Then I should see "Support for projects of 3-6 months"
    Then I should see "Get help from the Computational Science and Support Network (CSSN)"
    Then I should see "Modeled on the Northeast and CAREERS Cyberteams Workflow"
    Then I should see "Assistance to address computationally-intensive research challenges and needs"
    #TODO TEst specific link for below
    Then I should see "Learn More"
    #TEST Image
    Then I should see "MATCHPremier"
    Then I should see "Long-term Embedded Partnerships"
    Then I should see "Support for projects of 12-18 months"
    Then I should see "Work with CSSN facilitators, research software engineers, and/or other expert consultants"
    Then I should see "Flexible funding model requires advanced planning"
    Then I should see "Arranged between your institution and the consultant or through MATCH partnerships"
    Then I should see "Supported by MATCH"
    Then I should see "Strong support system to ensure you receive effective research support"
    #TODO TEst specific link for below
    Then I should see "Learn More"

    



