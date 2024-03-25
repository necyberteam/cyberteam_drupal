@templates
@api
@javascript

Feature: This Behat test goes over the CI Links Page, when accessed by an
unauthenticated user, this page does not display the "Add a CI Links" button. The search
function works on approved CI Links' titles only, is case-insensitive, and shows
a special message if no results are found. The page includes radio buttons to
filter CI Links by level (beginner, intermediate, advanced, expert), and the
results are shown in a table with columns for "Votes", "CI Links Title", "Category",
"Tags", and "Skill Level." There is also a text description at the top of the page.

  Scenario: Unauthenticated user tests the CI Links page
    Given I am not logged in
    When I go to "/knowledge-base/ci-links"
    Then I should see "CI Links"
    Then I should see "Use these links “vetted” by the community"
    Then I should see "Add a CI Link"
    Then I should see "Test CI Link Title"
    When I click "Add a CI Link"
    Then I should be on "/user/login?destination=/form/resource"
