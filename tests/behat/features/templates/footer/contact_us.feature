@templates
@api
@javascript

Feature: This Behat test goes over the Contact Us Page,
the contact form requires the following fields, all of which are required:
User's Name
Email Address
Email Subject
Message
Users need to fill out these fields to submit the contact form successfully.

  Scenario: Unauthenticated user fills out the contact us form
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    When I fill in "edit-name" with "Test"
    When I fill in "edit-mail" with "Test@email.com"
    When I fill in "edit-subject-0-value" with "Test"
    When I fill in "edit-message-0-value" with "Test"
    #op is the name for the Submit button
    When I click "op"
    Then I should get a "200" HTTP response


  Scenario: Authenticated user fills out the contact us form
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    And I should see "Your name"
    And I should see "Your email address"
    When I fill in "edit-subject-0-value" with "Test"
    When I fill in "edit-message-0-value" with "Test"
    #op is the name for the Submit button
    When I click "op"
    Then I should get a "200" HTTP response
