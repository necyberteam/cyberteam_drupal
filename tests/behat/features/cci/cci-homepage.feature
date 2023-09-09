@cci
@api
@javascript

Feature: verify specific items on CCI homepage
  This test verifies the following items:
    Heading
    Description
    Card and list views
    Links to program pages
    Programs heading
    Affinity groups heading
    Affinity groups description
    Check all program cards

  Scenario: Verify the main logo goes to home page
    Given I am not logged in
    When I am on the homepage
    When I follow "Connect CI"
    Then I should be on the homepage

  Scenario: Verify the main page has expected content
    Given I am not logged in
    When I am on the homepage
    Then I should see "Welcome to Connect Cyberinfrastructure"
    And I should see "A landing page for all our affiliated sites."
    And I should see "Connect.Cybinfrastructure is a family of portals"
    And I should see "Card View"
    And I should see "List View"
    And I should see "CAREERS Cyberteam"
    And I should see "Great Plains Cyberteam"
    And I should see "ACCESS Facilitators"
    And I should see "People who use or support people who use ACCESS resources and the ACCESS Resource Allocation System."
    When I click "List View"
    Then I should see "Programs"
    And I should see "Affinity Groups"

    When I am on the homepage
    Then link "ACCESS Support" should contain "https://support.access-ci.org/"

    Then link "CAREERS Cyberteam" should contain "https://careers-ct.cyberinfrastructure.org"
    Then link "Great Plains Cyberteam" should contain "https://greatplains.cyberinfrastructure.org"
    Then link "Kentucky Cyberteam" should contain "https://kycyberteam.cyberinfrastructure.org"
    Then link "Northeast Cyberteam" should contain "https://necyberteam.org"
    Then link "RMACC" should contain "https://ask.cyberinfrastructure.org/c/rmacc/65"
    Then link "SWEETER Cyberteam" should contain "https://sweeter.cyberinfrastructure.org"
    Then link "TRECIS Cyberteam" should contain "https://trecis.cyberinfrastructure.org"
    Then link "Campus Champions Region 1" should contain "/affinity-groups/campus-champions-region-1"

    When I follow "Anvil"
    Then I should be on "affinity-groups/anvil"
    And I should see "Purdue University is the home of Anvil"

  Scenario: Authenticated Verify the main logo goes to home page
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Connect CI"
    Then I should be on the homepage

  # TODO - currently broken - see D8-1014
  #Scenario: User is on the homepage and follows contact us
    Given I am not logged in
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/connect_ci"
    And I should see "Page not found"

  # TODO - currently broken
  Scenario: Authenticated User is on the homepage and follows contact us
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    When I follow "Contact Us"
    Then I should be on "contact/connect_ci"
    And I should see "Page not found"
