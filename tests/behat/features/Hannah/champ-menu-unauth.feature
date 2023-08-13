#@wip
@api
@javascript

Feature: verify specific links on homepage
  TODO:  move this out of WIP to champ
  TODO:  make sure this test verifies the following:
    Menu Items
      About Us
        Become a Campus Champion
        Affinity Group FAQ
        News
        Governance
        Code of Conduct
      Champions
        Current Campus Champions
      Community	People
        Affinity Groups
        Blogs
        Jobs
        Organizations
      Get Help
        Ask a Question link (to Ask.Cyberinfrastructure  in new tab)
        Enter a ticket (directs you to login page)
        Find Learning Resources (directs you to resources page)
    Tags
    Join Campus Champions Form
      TODO: List fields, which ones are required.
      Carnegie Code autocompletes when institution name is entered
      After submitting form, confirmation message is displayed

  #TODO is there a way to attach a file?  What file should I attatch?
  #TODO how to test "I am joining as a..."

  Scenario: User is on the homepage
    Given I am not logged in
    When I am on the homepage
    Then I should see "Log In"
    Then I should see "Join CC"
    Then I should not see "My Profile"
    Then I should see "About Us"
    Then I should see "Champions"
    Then I should see "Community"
    Then I should see "Get Help"
    Then I should see "Tags"
    When I click "Join CC"
    Then I should see "Join Campus Champions"
    Then I should see "Letter of Collaboration"
    Then I should see "Username"
    When I fill in "Username" with "test"
    Then I should see "First Name"
    When I fill in "First Name" with "test"
    Then I should see "Last Name"
    When I fill in "Last Name" with "test"
    Then I should see "Email"
    When I fill in "Email" with "test@email.com"
    Then I should see "I am joining as a..."
    #TODO How would i test this?
    # When I select "Student Champion" from "I am joining as a..."
    Then I should see "Carnegie Classification"
    When I fill in "Carnegie Classification" with "Champ"
    And I wait 10 seconds
    #When I select "Champlain College" from "Carnegie Classification"
    #When I click "submit"


