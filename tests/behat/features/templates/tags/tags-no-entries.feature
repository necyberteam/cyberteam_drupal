@templates
@api
@javascript

Feature: for a new tag, verify all blocks display a no entries message
  In order to verify all block show a no entries message
  As a user with an unathenticated role
  Create a new tag as admin, then as unathenticated person, verify no entries message

  Scenario: Authenticated user fills out the tags form
    Given I am logged in as a user with the "administrator" role
    When I go to "admin/structure/taxonomy/manage/tags/add"
    When I fill in "Name" with "behat_test_tag"
    When I check "Generate automatic URL alias"
    When I check "Published"
    When I press "Save"
    Then I should see "Created new term"

    Given I am not logged in
    When I go to "tags/behattesttag"
    Then I should see "behat_test_tag"
    Then I should see "There are no Mentors and Regional Facilitators associated with this topic."
    # TODO - when Ask.CI is working, fix this
    #Then I should see "There are no Ask.CI entries associated with this topic."
    Then I should see "There are no Affinity Groups associated with this topic."
    Then I should see "There are no Users associated with this topic."
    Then I should see "There are no CI Links associated with this topic."
    Then I should see "There are no projects associated with this topic."
    Then I should see "There are no Blog Entries associated with this topic."
