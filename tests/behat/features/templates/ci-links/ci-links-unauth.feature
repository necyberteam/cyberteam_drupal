@templates
@api
@javascript

Feature: This Behat test goes over the KB Resources Page, when accessed by an
unauthenticated user, this page does not display the "Add a Resource" button. The search
function works on approved KB Resources' titles only, is case-insensitive, and shows
a special message if no results are found.
 There is also a text description at the top of the page.

  Scenario: Unauthenticated user tests the KB Resources page
    Given I am not logged in
    When I go to "/knowledge-base/resources"
    Then I should see "Knowledge Base Resources"
    Then I should see "Cyberinfrastructure professionals"
    Then I should see "Add a Resource"
    Then I should see "Test CI Link Title"
    When I click "Add a Resource"
    Then I should be on "/user/login?destination=/form/resource"
