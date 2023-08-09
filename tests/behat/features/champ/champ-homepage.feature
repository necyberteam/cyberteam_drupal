@champ
@api
@javascript

Feature: For non-authenticated users, Campus Champions Specific Tests encompass the header
  displaying a Top Menu bar with a "Log In" link (to user log in), a "Join" link
  (to Join Campus Champions registration form), and the absence of the User menu.
  The Cyberteam Logo links to the homepage, featuring unique logos for each region site,
  and the Menu Items include an "About Us" link. The Front Page includes a Campus Champions
  banner with animated statistics and a Campus Champions YouTube video. It also features four
  links leading to the About page: "A Community of Practice," "Scientific Computing Advocates,"
  "Cyberinfrastructure Professionals," and "Mentors, Peers, and Students." Quick Links consist of
  options to join the community, access tags, and seek help, with links to Join Campus Champions
  Registration, Current Campus Champions page, affinity groups, Connect to Slack, Ask.Cyberinfrastructure,
  Submit a Help Desk Ticket, Find Learning Resource, and Find Expert by Tag.
  TODO: add test for
    Job Listings
      Four recent job posting cards
      More Jobs button linking to Ask.CI job listing page


  Scenario: Verify the main icon loads
    Given I am not logged in
    When I am on the homepage
    Then I should see an image with alt text "Campus Champions"
    Then I should see "Login"
    Then I should see "Join"
    Then I should see "About Us"
    Then I should see "Find Champions"
    Then I should see "Affinity Groups"
    Then I should see "CI Links"
    Then I should see "Advancing Science"
    Then I should see "Creating Community"
    Then I should see "Building Knowledge"
    Then I should see "Become a Champion"
    Then I should see "Information Sharing"
    Then I should see "Research Community"
    Then I should see "Help with ACCESS allocations"
    Then I should see "Campus Champions provide information on ACCESS and cyberinfrastructure"
    Then I should see "Find other Champions"
    Then I should see "We have an incredible diverse community of research"
    Then I should see "Beyond the all-Champions calls and email list,"
    Then I should see "Join Affinity Groups"
    Then I should see an image with alt text "Join Affinity Groups"

    When I click "Find Champions"
    And I wait 4 seconds
    Then I should be on "/champions/current-campus-champions"

    When I am on the homepage
    And I click "Join Affinity Groups"
    And I wait 4 seconds
    Then I should be on "/affinity-groups"

  Scenario: Unauthenticated user clicks "Join us"
    Given I am not logged in
    When I am on the homepage
    When I click "Join us"
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
    # How would i test this?
    # When I select "Student Champion" from "I am joining as a..."
    Then I should see "Carnegie Classification"
    When I fill in "Carnegie Classification" with "Champ"
    And I wait 10 seconds
    Then I should see "Champlain College"



