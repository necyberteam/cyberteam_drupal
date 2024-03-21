@templates
@api
@javascript
Feature: test people page Card view w/ filters
  Unauthenticated user tests the people page from Card View:
  Result cards display:	First & last name (link to user’s page)
	User’s region (if any),User profile image, User’s roles, User’s institution, User with skills (tags),
  Card View button is grayed out, List View button appears,
  Has no search restrictions on program. If you search you should see people from any program.
  Search works on people’s first and last names as expected
  Filter by Role multiselect:
    Student-facilitator restricts search results to accounts with the student-facilitator role
    Mentor restricts search results to accounts with the mentor role
    Researcher/Educator restricts search results to accounts with the researcher/educator role
    Steering Committee restricts search results to accounts with the steering committee role
    Regional Facilitator restricts search results to accounts with the regional facilitator role

  Scenario: Unauthenticated user tests the people page in Card View and filters
    Given I am not logged in
    When I go to "people/Card"
    Then I should see "People"
    And I should see "Filter By Program"
    And I should see "Search the people database"
    When I fill in "roles_target_id[]" with "mentor"
    Then I should see "mentor"
    When I fill in "roles_target_id[]" with " "
    And I should see "Card View"
    And I should see "Programs"
    And I should see "Roles"
    When I fill in "roles_target_id[]" with "ci systems engineer"
    And I should see "Affinity Groups"
    And I should see "Skills"
    And I should see "List view"
    When I fill in "Search the people database" with "testing123"
    And I wait 4 seconds
    Then I should see "No matches found in People."
    When I fill in "Search the people database" with "julie"
    And I wait 4 seconds
    Then I should see "Julie Ma"
    When I fill in "Search the people database" with "Northeast"
    And I wait 4 seconds
    Then I should see "Northeast"
    When I fill in "Search the people database" with " "
    And I wait 4 seconds
    When I fill in "edit-roles-target-id" with "Student-facilitator"
    And I wait 4 seconds
    Then I should see "Student-facilitator"
    When I fill in "edit-roles-target-id" with "Mentor"
    And I wait 4 seconds
    Then I should see "Mentor"
    When I fill in "edit-roles-target-id" with "Researcher/Educator"
    And I wait 4 seconds
    Then I should see "Researcher/Educator"
    When I fill in "edit-roles-target-id" with "Steering Committee"
    And I wait 4 seconds
    Then I should see "Steering Committee"
    When I fill in "edit-roles-target-id" with "Regional Facilitator"
    And I wait 4 seconds
    Then I should see "Regional Facilitator"
    When I fill in "edit-roles-target-id" with "Student-facilitator"
    And I wait 4 seconds
    Then I should see "Student-facilitator"
