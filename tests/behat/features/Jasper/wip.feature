@wip--
@api
@javascript
Feature: test individual Affinity Group page


  Scenario: Administrator adds existing ci-link to an affinity group
    Given I am logged in as a user with the "administrator" role
    When I go to "node/327/edit"
    Then I should see "Edit Affinity Group ACCESS Support"
    When I fill in "edit-field-resources-entity-reference-0-target-id" with "ci-link-for-user-200 (2)"
    #And I wait 4 seconds
    When I press "Save"
    Then I should see "Affinity Group ACCESS Support has been updated."
    Then I should see "ci-link-for-user-200"
    Then I should see "xxxxxx"



  Scenario: Admin user adds a CI Link to the AG ACCESS Support
    Given I am logged in as a user with the "administrator" role
    # add a CI-Link to an AG
    When I go to "node/327/edit"
    Then I should see "Edit Affinity Group ACCESS Support"
    # this CI link is created by amp_dev.install
    When I fill in "Display CI Links on your Affinity Group" with "ci-link-for-user-200"
    And I wait 1 seconds
    When I press "Save"
    And I wait 2 seconds
    Then I should see "Affinity Group ACCESS Support has been updated."
    When I follow "ci-link-for-user-200"
    And I wait 1 seconds
    Then I should see "ci-link-for-user-200"


  #Scenario: Administrator user creates CI Link and adds it to an affinity group
    Given I am logged in as a user with the "administrator" role
    When I go to "/form/resource"
    Then I should see "Knowledge Base Resources"
    When I fill in "title" with "dummy-ci-link-for-ag-testing"
    When I select "learning" from "category"
    When I check "Approved"
    # login tag
    When I check "edit-tags-682"
    When I check "Beginner"
    When I fill in "Description" with "dummy-ci-link-for-ag-testing"
    When I fill in "Link Title" with "dummy-ci-link-for-ag-testing"
    When I fill in "Link URL" with "http://example.com"
    #When I wait 3 seconds
    When I press "Submit"
    When I go to /knowledge-base/resources"
    Then I should see "dummy-ci-link-for-ag-testing"
