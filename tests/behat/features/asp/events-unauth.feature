@asp
@api
@javascript

Feature: test ACCESS Support Events Page and Individual Events Page
  In order to test the Events Page and Individual Events Page

  Scenario: Unauthenticated user tests the Events Page and Individual Events Page
    Given I am not logged in
    When I go to "/Events"
    Then I should see "Events and Training"
    Then I should see "Title"
    Then I should see "Cybersecurity and Coding for Middle and High School Students"
    Then I should see "Date"
    Then I should see "1/03/2023"
    Then I should see "Time"
    Then I should see "10:00 AM EST "
    Then I should see "Description"
    Then I should see "Julia is a high-level dynamic language,"
    When I click "Cybersecurity and Coding for Middle and High School Students"
    Then I should be on "/events/17"
    Then I should see "Cybersecurity and Coding for Middle and High School Students"
    #TODO Ttitle label?
    When I click "< Back to events"
    Then I should be on "/events"