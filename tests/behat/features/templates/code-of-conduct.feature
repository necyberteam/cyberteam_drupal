@templates
@api
@javascript

Feature: Code of Conduct page

  Scenario: Verify essential features on code of conduct page
    Given I am not logged in
    When I go to "/connectci-code-of-conduct"
    Then I should get a "200" HTTP response
    Then I should see "Connect CI Code of Conduct"
    Then I should see "Connect.Cyberinfrastructure is a family of portals,"
    Then I should see "Diversity Statement"
    Then I should see "Connect CI welcomes and encourages participation"
    Then I should see "Introduction & Scope"
    Then I should see "This code of conduct should be honored by everyone"
    Then I should see "Standards for Behavior"
    Then I should see "All communication should be appropriate for a professional audience"
    Then I should see "Unacceptable Behavior"
    Then I should see "We, the members of Connect CI, are committed to making participation in this community a harassment-free experience."
    Then I should see "Reporting Guidelines"
    Then I should see "If you believe someone is violating the code of conduct,"
    Then I should see "How to Submit a Report"
    Then I should see "If you feel your safety is in jeopardy or the situation is an emergency"
    Then I should see "License"
    Then I should see "This code of conduct has been adapted from the US-RSE Association and NumFocus"
