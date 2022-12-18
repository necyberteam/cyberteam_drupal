#@wip
@api
@javascript

Feature: test ACCESS Support knowledge base
  In order to test the knowledge base

  Scenario: Unauthenticated user tests the knowledge base
    Given I am not logged in
    When I go to "/resources"
    Then I should see "Resources"
    Then I should see "These resources have been crowd-sourced from the ConnectCI community"
    Then I should see "ADD NEW RESOURCE"
    When I click "Add new resource"
    Then I should be on "/user/login?destination=/form/resource"

    When I go to "/user/login?destination=/form/resource"
    #TODO
    #No resources this this part will fail
    Then I should see "Votes"
    Then I should see "Title"
    Then I should see "Description"
    Then I should see "Category"
    Then I should see "Tags"
    Then I should see "Skill Level"
    Then I should see "Affinity Group"
    Then I should see "Somethingfef"

    # Add in creation of resource and then test it