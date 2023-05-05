@templates
@api
@javascript

Feature: test affinity group request form
  In order to test the affinity group request form
  As a user of the authenticated role

  Scenario: Administrator user fills out affinity group form
    Given I am logged in as a user with the "authenticated" role
    When I go to "affinity-groups"
    When I follow "Request an Affinity Group"
    Then I should be on "form/affinity-group-request"
    And I should see "Affinity Group Request"
    And I should see "Affinity Group Name"
    And I should see "Affinity Group Image"
    And I should see "Coordinators"
    And I should see "Type a few letters of the name and then select from the list of names presented"
    And I should see "Tags"
    And I should see "Select one (or more) related CiDeR resources"
    And I should see "Short Description"
    And I should see "Provide a short description that will appear on the Affinity Groups directory page."
    And I should see "Description"
    And I should see "Provide a description that will be displayed on this Affinity Group. It can be the same as the short description above if there is no additional information needed."
    And I should see "Slack"
    And I should see "Provide a link to the Slack group if applicable"
    And I should see "Q&A Platform"
    And I should see "Provide a link to Ask.CI, StackExchange, or other Q&A platform specific to the Affinity Group."
    And I should see "Github Organization"
    And I should see "Provide a link to the Github Organization if applicable."
    And I should see "Email List or Contact"
    And I should see "Provide a link to the email list or email contact for the Affinity Group. Please enter the full URL to your mailing list including the https:// or if an email please type mailto: before the address. For example: mailto:example@email.com"
    When I fill in "affinity_group_name" with "TEST"
    When I fill in "short_description" with "TEST"
    When I fill in "project_description" with "TEST"
    # op is the submit button
    When I press "Submit"
    And I wait for the page to be loaded
    #Submission confirmation is not passing
    Then I should see "Thank you for your submission. We will contact you when your affinity group has been created."
