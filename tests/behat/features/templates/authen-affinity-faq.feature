@templates
@api
@javascript
Feature: test affinity faq page 
  In order to test the affinity faq page



  Scenario: Administrator user test the affinity faq page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/about-us/affinity-groups-faq"
    Then I should see "Affinity Groups FAQ"
    Then I should see "Affinity Groups encourage community members"
    Then I should see "What is an Affinity Group?"
    Then I should see "A group that encourages focused"
    Then I should see "What are the benefits of Affinity Groups?"
    Then I should see "Extra touchpoint when"
    Then I should see "Who can join an affinity group"
    Then I should see "Anyone with an account"
