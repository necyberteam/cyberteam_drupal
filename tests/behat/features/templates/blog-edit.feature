@templates
@api
@javascript

Feature: add a tag to a blog post 
  To test adding a tag to a blog post 
  As admin
  I can edit a blog post, add a tag, and verify the tag is added to the blog 

  Scenario: Add a "test-blog-post" for "login" tag and verify it appears
    Given I am logged in as a user with the "administrator" role
    When I go to "blog/mghpcc-co-leads-two-birds-feather-sessions-sc21"
    When I click "Edit"
    Then I should see "Edit Blog post (region)"
    # tag is "cloud-commercial"
    When I select "193" from "edit-field-tags"
    When I press "Save" 
    Then I should see "has been updated"
    
    When I go to "blog"
    Then I should see "This year at SC21"
    And I should see "cloud-commercial"

