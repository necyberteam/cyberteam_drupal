@asp
@api
@javascript

Feature: test ACCESS Support knowledge base
  In order to test the knowledge base

  Scenario: Unauthenticated user tests the knowledge base
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Find what you're looking for"
    Then I should see "Knowledge Base"
    Then I should see "ACCESS Knowledge Base"
    Then I should see "Explore the Knowledge Base and connect with community experts and other researchers"
    Then I should see "Browse the Documentation"
    Then I should see "Resource provider guides with specific information about"
    Then I should see "View Documentation"
    Then I should see "Ask.CI Q&A"
    Then I should see "Browse the Documentation"
    Then I should see "Visit ASK.CI"
    Then I should see "Crowd-sourced Links"
    Then I should see "contributed by the community"
    Then I should see "Visit CI Links"
    Then I should see "Community Affinity Groups"
    Then I should see "Engage in direct connections with community experts and other researchers through, Slack, email and Q&A forums."
    Then I should see "Explore Groups"
    Then I should see "Getting started with ACCESS"
    Then I should see "ACCESS services are many and varied including allocations,"
    Then I should see "View this Documentation"
    Then I should see "Go To Allocations"
    Then I should see "View Cheatsheet"
    When I click "Visit CI Links"
    Then I should be on "/ci-links"
    When I go to "/knowledge-base"
    Then I should see "Explore Groups"
    When I click "Explore Groups"
    And I wait for the page to be loaded
    Then I should be on "/affinity_groups"
    When I go to "/knowledge-base"
    Then I should see "Getting Started with ACCESS"
    Then I should see "ACCESS Services are many and varied including allocations,"
    Then I should see "How do I get started with ACCESS?"
    Then I should see "An introductory guide."
    #This views the first one but not the correct one
    Then I should see "View this Documentation"
    Then I should see "How do I request compute or storage resources?"
    Then I should see "Everything you need to know about getting resources from ACCESS."
    # TODO wrong page
    When I click "Go to Allocations"
    Then I should get a "200" HTTP response

    # Then I should be on "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/129143245/FAQs"

    When I go to "/knowledge-base"
    Then I should see "Where can I find information that was on the XSEDE User Portal?"
    Then I should see "A handy list of where to find info for researchers with XSEDE experience."
    When I click "View Cheatsheet"
    Then I should get a "200" HTTP response

    # Then I should be on "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/129144254/Cheatsheets+for+XSEDE+Users"

  Scenario: Unauthenticated user tests the Frequently Asked Questions section on the knowledge base page
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Frequently Asked Questions"
    #TODO Button for drop down does not seem to work
    #When I click "collapseOne"
    # Then I should see "Visit the ACCESS HOME page to learn about all of the ACCESS"

  Scenario: Unauthenticated user tests the Visit our Forums section on the knowledge base page
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Visit our Forums"
    Then I should see "ACCESS Support is partnering with the Ask.CI Q&A Platform"
    Then I should see "Jetstream"
    Then I should see "ACCESS Allocations"
    Then I should see "Bridges-2"
    Then I should see "Large data sets"
    Then I should see "Quantum Computing"
    Then I should see "Cloud Computing"
    Then I should see "See all Forums"
    When I click "See all Forums"
    Then I should be on "https://ask.cyberinfrastructure.org"
    
  Scenario: Unauthenticated user tests the Community Contributed CI Links section on the knowledge base page
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Community Contributed CI Links"
    Then I should see "ACCESS Support encourages contributions of useful websites, documentation,"
    Then I should see "The Carpentries"
    Then I should see "The Carpentries teach foundational coding"
    Then I should see "Cornell Virtual Workshop"
    Then I should see "Comprehensive training resource for high performance computing topics. "
    Then I should see "HPC University"
    Then I should see "A comprehensive list of training resources from Shodor."
    Then I should see "Using Linux commands in a python script"
    Then I should see "Learn how to use the subprocess and os modules in python to run"
    Then I should see "Higher Ed Controlled Unclassified Information Slack (HigherEdCUI)"
    Then I should see "This slack channel is an excellent resource for conversing about CUI."
    Then I should see "Version control with Git"
    Then I should see "Understand the benefits of an automated version control system"
    Then I should see "See all CI Links"

  Scenario: Unauthenticated user tests the Affinity Groups section on knowledge base page
    Given I am not logged in
    When I go to "/knowledge-base"
    Then I should see "Affinity Groups"
    And I should see "Joining ACCESS Resource Provider Affinity Groups (AGs) will add"
    # TODO -- maybe update to "should have alt text" after hannah reviews images.
    #    And not currently passing because not all files are getting copied, awaiting Miles' work
    # And all images with selector ".view-affinity-group img" should load
    When I click "All Affinity Groups"
    Then I should be on "/affinity_groups"
