@wip--
@api

Feature: add a blog post with a tag
  To test adding a blog post with a tag
  As admin
  I can add a blog post with a tag and verify the blog appears for the tag

  Scenario: Add a "test-blog-post" for "login" tag and verify it appears
    Given I am logged in as a user with the "administrator" role

    # first create a dummy project
    When I go to "form/project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-dummy-project-for-blog"
    When I check "At-Large"
    # tags:
    When I check "cloud-commercial"
    When I fill in "First" with "test-first-name"
    When I fill in "Last" with "test-last-name"
    When I fill in "Email" with "test@email.com"
    When I fill in "Project Description" with "test project description"
    When I press "Submit"
    Then I should see "test-dummy-project-for-blog"

    # create a dummy second project
    When I go to "form/project"
    When I check "Received"
    When I check "Accept and Publish"
    When I fill in "Project Title" with "test-dummy-project-for-blog"
    When I check "At-Large"
    # tags:
    When I check "cloud-commercial"
    When I fill in "First" with "test-first-name"
    When I fill in "Last" with "test-last-name"
    When I fill in "Email" with "test@email.com"
    When I fill in "Project Description" with "test project description"
    When I press "Submit"
    Then I should see "test-dummy-project-for-blog"

    When I go to "node/add/blog_post"
    When I fill in "Title" with "test-blog-post-with-tag-cloud_commercial"
    # tag is "cloud-commercial"
    When I select "183" from "edit-field-tags"
    When I fill in "Project" with "test-dummy-project-for-blog (1)"
    When I check "Published" 
    When I press "Save" 
    Then I should see "test-blog-post-with-tag-cloud_commercial"
    And I should see "cloud-commercial"
    And I should see "test-dummy-project-for-blog"

    Given I am not logged in
    When I go to "tags/cloud-commercial"
    Then I should see "Blog Entries"
    When I follow "test-blog-post-with-tag-cloud_commercial"
    Then I should see "test-blog-post-with-tag-cloud_commercial"
    And I should see "cloud-commercial"
    And I should see "test-dummy-project-for-blog"
    
    