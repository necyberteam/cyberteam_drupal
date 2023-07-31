@careers
@api
@javascript

Feature: test Distributed Experts Network
  In order to test the Distributed Experts Network page


  Scenario: Unauthenticated user Test the Distributed Experts Network section on the Homepage
    Given I am not logged in
    When I go to the homepage
    Then I should see "NEW PROGRAM!"
    Then I should see "Distributed Experts Network (DEN)"
    Then I should see "Our experts can assist with computational challenges"
    Then I should see "Request a consult and we will find an expert who can help you."
    Then I should see an image with alt text "Have a compute question no one in your lab can answer? Need help deciding which modeling tool to deploy? Wondering where to get more cycles?"
    Then I should see "REQUEST A CONSULT"
    Then I should see "FIND OUT MORE"


  Scenario: Unauthenticated user Test the Distributed Experts Network page
    Given I am not logged in
    When I go to "/distributed-experts-network"
    Then I should see "Distributed Experts Network (DEN)"
    Then I should see "Our experts can assist with computational challenges at small and mid-sized institutions."
    Then I should see "Request a consult and we will find an expert who can help you."
    Then I should see an image with alt text "Have a compute question no one in your lab can answer? Need help deciding which modeling tool to deploy? Wondering where to get more cycles?"
    Then I should see "REQUEST A CONSULT"
    Then I should see "A Sample of DEN Expertise Areas"
    Then I should see "Astrophysics"
    Then I should see "Bioinformatics"
    Then I should see "Computational Chemistry"
    Then I should see "Digital Humanities"
    Then I should see "Economics"
    Then I should see "Machine Learning"
    Then I should see "Example Projects"
    Then I should see "Getting Started with Jupyter Notebooks"
    Then I should see "A researcher who was recently granted a startup allocation on a"
    Then I should see "Integration of a New Sequencer"
    Then I should see "A lab acquires a new sequencer that requires a Linux based “headnode”"
    Then I should see "Electronic Structure Software set-up"
    Then I should see "A Chemistry Researcher can use help selecting installing, configuring,"
    Then I should see "Optimizing Workflow"
    Then I should see "A researcher got funding to purchase dedicated resource access and"

  Scenario: Unauthenticated user Test the Distributed Experts Network form
    Given I am logged in as a user with the "authenticated" role
    When I go to "/distributed-experts-network"
    When I click "REQUEST A CONSULT"
    Then I should be on "/form/distributed-experts-network-help"
    Then I should see "Distributed Experts Network Help Request Form"
    When I fill in "Institution's Carnegie Code" with "167394"
    When I check "My institution wasn’t listed"
    Then I should see "Institution"
    When I uncheck "My institution wasn’t listed"
    When I fill in "Please provide a brief description of your computational challenge." with "Testing"
    When I fill in "What have you tried so far to solve this challenge?" with "testing"
    #edit-actions-submit is the request help button
    When I press "edit-actions-submit"
    And I wait 5 seconds
    Then I should see "New submission added to Distributed Experts Network Help Request Form."


