@asp
@api
@javascript

Feature: test ci-link submission page as an administrator user
  In order to test the ci-links submission page as an administrator user

  Scenario: Administrator user Test ci links submission page
    Given I am logged in as a user with the "administrator" role
    When I go to "/admin/structure/webform/manage/resource/results/submissions"
    Then I should see "test-login-resource"
    Then I should see "#"
    Then I should see "Title"
    Then I should see "Approved"
    Then I should see "Category"
    Then I should see "User"
    Then I should see "Created"
    Then I should see "Changed"
    Then I should see "Link to CI link"
    Then I should see "Operations"
    When I click "test-login-resource"
    When I click "Edit"
    When I check "Approved"
    When I wait 3 seconds
    #op is the Save button
    When I press "op"
    And I wait 5 seconds
    Then I should see "Submission updated in CI Link."
