@templates
@api
@javascript

Feature: add a blog post with a tag
  To test adding a blog post with a tag
  As admin
  I can add a blog post with a tag and verify the blog appears for the tag

  Scenario: Add a "test-blog-post" for "login" tag and verify it appears
    Given I am logged in as a user with the "administrator" role
    When I go to "node/add/blog_post"
    When I fill in "Title" with "test-blog-post"
    # tag is "login"
    When I select "682" from "edit-field-tags"
    When I check "Published"
    When I press "Save"
    Then I should see "has been created"
    And I should see "login"
    When I go to "tags/login"
    Then I should see "Blog Entries"
    And I should see "test-blog-post"

