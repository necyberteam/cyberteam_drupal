@champ
@api
@javascript

Feature: test for the become a campus champion page as an authenticated user
  Scenario: User runs through the become a campus champion page as authenticated
    Given I am logged in as a user with the "authenticated" role
    When I go to "/about-us/become-a-campus-champion"
    Then I should see "Become a Campus Champion"
    Then I should see "Become a Champion"
    When I press "Join the Champions"
    Then I should be on "/form/join-campus-champions"
    When I go to "/about-us/become-a-campus-champion"
    Then I should see "Student Champions"
    Then I should see "Champions Fellows"
    Then I should see "info@campuschampions.org"
