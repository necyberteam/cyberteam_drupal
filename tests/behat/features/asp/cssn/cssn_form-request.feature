@asp
@api
@javascript

Feature: As an authenticated user, test the join-the-cssn form.  Fill in
  the form, submit it, and verify correct response & fields.
  TODO: anonymous people are redirected to /user/login

  Scenario: Authenticated user fills out CSSN form selecting all the roles
    Given I am logged in as a user with the "authenticated" role
    When I go to "/form/join-the-cssn-network"
    Then I should see "Join the CSSN Network"
    Then I should see "How would you like to participate in the CSSN?"
    Then I should see "General Member"
    Then I should see "MATCHPlus Mentor"
    Then I should see "Student-Facilitator"
    Then I should see "Premier Consultant"
    Then I should see "NSF-funded CIP"
    When I check "i_am_joining_as_a_[General Member]"
    When I check "i_am_joining_as_a_[MATCHPlus Mentor]"
    When I check "i_am_joining_as_a_[Student-Facilitator]"
    When I check "i_am_joining_as_a_[Premier Consultant]"
    When I check "i_am_joining_as_a_[NSF-funded CIP]"
    #academic_status_select2 is the Academic Status
    When I select "1st year undergraduate" from "academic_status_select2"
    # add a wait before submitting to avoid "There was a problem with your form submission.  Please wait NN seconds and try again."
    And I wait 1 seconds
    When I press "Submit"
    And I wait 3 seconds
    Then I should see "Thank you for joining the cssn."
    Then I should see "Thanks for updating your CSSN membership."

  Scenario: Verify selected roles were added properly
    When I go to "/community-persona"
    And I wait for the page to be loaded
    Then I should see "CSSN Member"
    Then I should see "Roles:"
    Then I should see "mentor"
    Then I should see "student-facilitator"
    Then I should see "Consultant"
    Then I should see "CIP"
    Then I should see "CSSN"
