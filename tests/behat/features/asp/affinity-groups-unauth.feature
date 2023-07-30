@asp
@api
@javascript

Feature: test ACCESS Support Affinty Groups Page

  Scenario: Unauthenticated user tests the Affinity Groups page
    Given I am not logged in
    When I go to "/affinity_groups"
    Then I should see "Affinity Groups"
    Then I should see "Affinity Groups encourage community members to gather"
    Then I should see "Logo"
    Then I should see "Affinity Group"
    Then I should see "Description"
    Then I should see "Tags"
    # TODO 7/26/23 not working on Github - image not there
    #Then I should see an image with alt text "The words Campus Champions ACCESS Facilitators"
    Then I should see "ACCESS Facilitators"
    Then I should see "People who use or support people"
    When I am on "/affinity_groups"
    When I follow "research-facilitation"
    And I wait 2 seconds
    Then I should be on "/tags/research-facilitation"

    When I am on "/affinity_groups"
    When I follow "Login to join"
    And I wait 4 seconds
    Then I should be on "/user/login"

  Scenario: Unauthenticated user tests Request an Affinity Group link takes you to login and then a webform to request a new Affinity Group
    Given I am not logged in
    When I am on "/affinity_groups"
    Then I should see "submit a request form"
    When I click "submit a request form"
    Then I should be on "user/login?destination=/form/affinity-group-request"

