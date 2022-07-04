@cyberteam
@api
Feature: test node types
  In order to create a Basic Page
  As a user of the admin role
  I need to see fill in the following fields

  Scenario: Admin user fills in a Basic Page and views it after submission
    Given I am logged in as a user with the "administrator" role
    When I go to "node/add/page"
    When I fill in "Title" with "Quick TEST"
    When I fill in "Body" with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget eleifend mi. Aliquam erat volutpat. In lobortis risus sit amet accumsan sollicitudin. Aliquam viverra diam ex, ut luctus est consequat at. Curabitur facilisis tellus eu ex cursus scelerisque. Suspendisse dictum ullamcorper massa, vitae accumsan tellus tincidunt non. In neque nisl, eleifend tempor sapien at, lacinia dictum ligula."
    When I press "Save"
    Then I should see "Quick TEST"
    Then I should see "Lorem ipsum dolor sit amet"
