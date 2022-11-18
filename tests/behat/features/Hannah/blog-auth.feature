@wip--
@api
@javascript
#Error not blog entries
Feature: test for the blog page 
  In order to test the blog page

  Scenario: Authenticated user tests the blog page
    Given I am logged in as a user with the "authenticated" role
    When I go to "/blog"
    Then I should see "Project Blog"
    Then I should see "Regional Blog"

