@asp
@api
@javascript

Feature: test ACCESS Support OnDemand Page
  In order to test the OnDemand Page

  Scenario: Unauthenticated user tests the OnDemand Page
    Given I am not logged in
    When I go to "/ondemand"
    Then I should see "Seamless Supercomputing on the Web"
    Then I should see "ACCESS OnDemand"
    Then I should see "Improving the ACCESS Experience"
    Then I should see "Common web-based interfaces integrated with ACCESS services."
    Then I should see "Anvil"
    Then I should see "Bridges2"
    Then I should see "DELTA"
    Then I should see "Expanse"
    Then I should see "Running OnDemand and don't see your resource listed?"
    Then I should see "Limited Scope Pilot"
    Then I should see "For Researchers"
    Then I should see "Use OnDemand on these ACCESS allocated resources"
    #TODO Test Images
    Then I should see "Learn more about OnDemand"
    Then I should see "ACCESS OnDemand helps computational researchers and students efficiently"
    #TODO Need to test link to Learn More
    Then I should see "Learn More"
    Then I should see "For Resource Providers"
    Then I should see "The ACCESS OnDemand team will be providing OnDemand plugins,"
    #TODO Need to test link to LEarn More
    Then I should see "Learn More"
    #TODO NEEd to test images
    Then I should see "Connect with us on Discourse"
    Then I should see "Join the Community"
    Then I should see "The ACCESS OnDemand project team has a long track record of working with the"
    #TODO Need to test link to Join Us
    Then I should see "Join Us"