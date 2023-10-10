@asp
@api
@javascript

Feature: test affinity group request form
  authenticated role should be able to complete the affinity group request form
  TODO: anonymous should be redirected to /user/login

  Scenario: Authenticated user fills out affinity group form
    Given I am logged in as a user with the "authenticated" role
    When I go to "form/affinity-group-request"
    And I should see "Affinity Group Request"
    And I should see "Affinity Group Name"
    And I should see "Do you have a logo or image?"
    And I should see "Affinity Group Image"
    And I should see "Coordinators"
    And I should see "Type a few letters of the name and then select from the list of names presented"
    And I should see "Tags"
    And I should see "If you are an ACCESS RP, select one (or more) related CiDeR resources"
    And I should see "Summary"
    And I should see "Provide a short description that will appear on the Affinity Groups directory page."
    Then I should see "Maximum 160 Characters Allowed"
    And I should see "Description"
    And I should see "Please include information about the intent of the group, what type of communications you expect the group will use, and how often"
    And I should see "Slack"
    And I should see "Provide a link to an associated Slack group, if there is one"
    And I should see "Q&A Platform"
    And I should see "Provide a link to Ask.CI, StackExchange, or other Q&A platform specific to the Affinity Group."
    And I should see "Github Organization"
    And I should see "Provide a link to the Github Organization if applicable."
    And I should see "Email List or Contact"
    And I should see "Provide a full URL to your email list or email contact for the Affinity"
    When I fill in "affinity_group_name" with "TEST"
    When I fill in "edit-tags" with "Login"
    When I fill in "short_description" with "TEST"
    When I fill in "project_description" with "TEST"
    # op is the submit button
    And I wait 2 seconds
    When I press "Submit"
    And I wait for the page to be loaded
    #Then I should see "Thank you for your submission"
