@asp
@api
@javascript

Feature: test CCMNET Page and submission
  TODO: this should be in the CCMNet domain tests
  
  Scenario: Authenticated user tests the CCMNET Page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/form/get-updates-about-ccmnet"
    Then I should see "Get Updates about CCMNET"
    Then I should see "Join the CCMNET Mailing list to receive periodic updates."
    When I fill in "name[first]" with "Test"
    When I fill in "name[last]" with "Test"
    When I fill in "email" with "test@email.com"
    When I wait 3 seconds
    When I press "op"
    Then I should see "Thanks for joining the CCMNet email list!"
