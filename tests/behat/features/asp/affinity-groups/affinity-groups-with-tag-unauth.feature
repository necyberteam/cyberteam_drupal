@asp
@api
@javascript

Feature: test ACCESS affinity groups with the same tag page

  Scenario: Unauthenticated user tests affinity groups with tag page
    Given I am not logged in
    When I am on "/tag/80/affinity-groups"
    Then I should see "Affinity Groups tagged gpu"
    Then I should see "Name"
    Then I should see "Description"
    Then I should see "Tags"
    Then I should see "Join"
    Then I should see an image with alt text "Anvil ACCESS Affinity Group"
    When I follow "Anvil"
    Then I should be on "/affinity-groups/anvil"
    When I am on "/tag/80/affinity-groups"
    When I follow "gpu"
    Then I should be on "/tags/gpu"