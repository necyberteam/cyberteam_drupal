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
