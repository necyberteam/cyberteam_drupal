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
    Then I should see an image with alt text "The words Campus Champions ACCESS Facilitators"
    Then I should see "ACCESS Facilitators"
    Then I should see "People who use or support people"
    When I am on "/affinity_groups"
    # TODO Following is failing in github only when running entire test suite (not when running just asp on github)
    # with this error:  Tag matching xpath "//DIV[@id="block-accesstheme-content"]/DIV[1]/DIV[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[6]/TD[4]/A[1]" not found.
    And I wait 4 seconds
    When I follow "research-facilitation"
    # TODO repeated failing on github with "Current page is "/affinity_groups", but "/tags/research-facilitation" expected."
    And I wait 4 seconds
    Then I should be on "/tags/research-facilitation"
    When I am on "/affinity_groups"
    When I follow "Login to join"
    And I wait 4 seconds
    Then I should be on "/user/login"

#TODO: test Request an Affinity Group link takes you to login and then a webform to request a new Affinity Group
