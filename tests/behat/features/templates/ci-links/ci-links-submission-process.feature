@templates
@api

Feature: test KB Resource submission page as an administrator user
  In order to test the KB Resource submission page as an administrator user

  Scenario: Administrator user Test KB Resource submission page
    Given I am logged in as a user with the "administrator" role
    When I go to "/admin/structure/webform/manage/resource/results/submissions"
    Then I should see "Test CI Link Title 2"
    Then I should see "#"
    Then I should see "Title"
    Then I should see "Approved"
    Then I should see "Category"
    Then I should see "User"
    Then I should see "Created"
    Then I should see "Changed"
    Then I should see "Link to Resource"
    Then I should see "Operations"
    When I click "Test CI Link Title 2"
    When I click "Edit"
    When I check "Approved"
    When I wait 3 seconds
    #op is the Save button
    When I press "edit-submit"
    And I wait 5 seconds
    Then I should see "Submission updated in CI Link."
