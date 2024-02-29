@champ--
@api
@javascript

Feature: For authenticated users, the Request An Affinity Group Form includes
fields such as Affinity Group Name, Upload Image, Region, Coordinators, Tags,
Short Description, Description, Slack Link, and Ask.Ci Locale Link. Additionally,
an "Approved" checkbox is available exclusively for administrators.

  #TODO update this

  Scenario: User runs through the affinity group page and individual page as admin.
    Given I am logged in as a user with the "administrator" role
    When I go to "/affinity-groups"
    When I click "Request an Affinity Group"
    #Then I should see "masquerade"
