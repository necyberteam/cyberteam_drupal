@champ
@api
@javascript

Feature: test for the become a campus champion page as an authenticated user
  Scenario: User runs through the become a campus champion page as authenticated
    Given I am logged in as a user with the "authenticated" role
    When I go to "/about"
    Then I should see "We foster a dynamic environment for a diverse"
    # TODO find way to press "Join"
    #When I press "Join"
    #Then I should be on "/form/join-campus-champions"

  Scenario: Aunthenticated user uses the Join Campus Champion form
    Given I am logged in as a user with the "authenticated" role
    When I go to "/form/join-campus-champions"
    Then I should see "Join Campus Champions"
    Then I should see "Letter of Collaboration"
    Then I should see "Carnegie Classification"
    # TODO complete this
