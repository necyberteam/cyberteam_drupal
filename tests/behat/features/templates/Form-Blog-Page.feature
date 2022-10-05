@templates
@api
#@javascript
Feature: test blog page 
  In order to test the Blog page



  Scenario: Administrator user fills out Blog form
    Given I am logged in as a user with the "administrator" role
    When I go to "/node/add/blog_post"
    Then I should see "Create Blog post"
    When I fill in "Title" with "TESTing"


    #682 is the login tag
    When I select "682" from "edit-field-tags" 
    

    When I fill in "Project" with "TEST(1)"

    When I attach the file "media/logo.png" to "edit-field-image-0-upload"

    # Body fill has error
    # Todo: Custom feature context for rich text 

    #When I fill in "Body" with "TEST"

    When I press "Save"
    Then I should see "Test"

    Then I should see "Hello World"
   


    