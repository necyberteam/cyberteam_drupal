@templates
@api
@javascript

Feature: Testing the Help Desk Admin Page

  Scenario: Admin makes sure Help Desk Page has all major features
    Given I am logged in as a user with the "administrator" role
    When I go to "/help-desk"
    Then I should see "Help Desk"
    #Below line is commented out since not all domains have no tickets
    #Then I should see "There are currently no open tickets."
    Then I should see "At-Large"
    Then I should see "Title"
    Then I should see "Region"
    Then I should see "Category"
    Then I should see "Priority"
    Then I should see "Details"
    Then I should see "Assigned"
    Then I should see "Status"
    Then I should see "View"
    Then I should see "Tags"
