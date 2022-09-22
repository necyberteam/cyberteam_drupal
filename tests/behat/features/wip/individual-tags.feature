@wip
@api
Feature: test individual tags page
  Tests for individual tags page

   Scenario: Verify content for tag "bioinformatics"
      Given I am not logged in
      When I go to "tags/bioinformatics"
      Then I should see "bioinformatics"
      And I should see "Mentors and Regional Facilitators"
      And I should see "Brett Milash"
      And I should see "RMACC"
      And I should see "Topics from Ask.CI"
      And I should see "Juan Vanegas"
      And I should see "researcher/educator"
      And I should see "Jetstream-2"
      And I should see "There are no resources associated with this topic"
      And I should see "There are no projects associated with this topic"
      And I should see "There are no Blog Entries associated with this topic."
      And I should see "RMACC"
