@asp
@api
@javascript

Feature: Verify options for the status of an engagement for authenticated and match_sc users
  Test that both an authenticated and match_sc user can create & edit an engagement.
  Verifies a match_sc user can update the status to anything.
  Verifies an authenticated: This test creating MATCH-Plus and MATCH-Premier engagemnts, including
  that an authenticate:
    Should not see an option to receive the engagement
    Should not see an option to decline the engagement

  Scenario: verify engagement status options for match_sc user has all 4 options
    Given I am logged in as a user with the "match_sc" role
    When I am on "/matchplus"
    Then I should see "Request a Pilot Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefg222"
    When I select "Submitted" from "edit-moderation-state-0-state"
    When I press "Save"
    And I wait 2 seconds
    Then I should see "Test match_engagement abcdefg222"

    # verify they can edit their engagement
    When I follow "abcdefg222"
    When I follow "Edit"
    And I wait 2 seconds

    # verify the can accept or decline their engagement
    # Then I print element with id "edit-moderation-state-0-state"
    # if match_sc, <option value="in_review" selected="selected">Submitted</option><option value="received">Received</option><option value="draft">Draft</option><option value="declined">Declined</option>
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "Submitted"
    Then element "edit-moderation-state-0-state" should contain "Declined"
    Then element "edit-moderation-state-0-state" should contain "Received"


  Scenario: verify engagement status options for authenticated user does not include received or declined
    Given I am logged in as a user with the "authenticated" role
    When I am on "/matchplus"
    Then I should see "Request a Pilot Engagement"
    When I click "Request a Pilot Engagement"
    Then I should be on "/node/add/match_engagement?type=plus"
    Then I should see "Create MATCH+ Engagement"
    When I fill in "Project Title" with "Test match_engagement abcdefg111"
    When I press "Save"
    And I wait 2 seconds
    Then I should see "Test match_engagement abcdefg111"

    # verify they can edit their engagement
    When I follow "abcdefg111"
    When I follow "Edit"
    And I wait 2 seconds

    # verify the cannot accept or decline their engagement
    #Then I print element with id "edit-moderation-state-0-state"
    # if authenticated, should see:
    #       │ element 'edit-moderation-state-0-state': '<option value="draft" selected="selected">Draft</option><option value="in_review">Submitted</option>'
    Then element "edit-moderation-state-0-state" should contain "Draft"
    Then element "edit-moderation-state-0-state" should contain "Submitted"
    Then element "edit-moderation-state-0-state" should not contain "Declined"
    Then element "edit-moderation-state-0-state" should not contain "Received"
