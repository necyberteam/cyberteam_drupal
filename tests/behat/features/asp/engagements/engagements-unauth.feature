@asp
@api
@javascript

Feature: test ACCESS Support Engagements Page
  Verify the MATCHPlus & MATCHPremier Engagements sections show,
  and following an engagement works properly.
  TODO: test More/Less buttons.

  Verify that an engagement page shows title, institution, status, TODO: urgency,
  TODO: researcher(s), image, tags, student, mentor
  TODO: "I'm interested" button shows when in recruiting status
  (Maybe this should be it's own feature file?)
  TODO: authenticated tests

  Scenario: Unauthenticated user tests the Engagements Page
    Given I am not logged in
    When I go to "/engagements"
    Then I should see "MATCHPlus Engagements"
    Then I should see "MATCHPremier Engagements"

    # testing Titles link to Engagements
    When I follow "UVM Art and AI Initiative"
    Then I should be on "/node/331"

    When I am on "/engagements"
    When I follow "UVM Art and AI Initiative"
    Then I should be on "/node/331"

    # TODO: More buttons expand box to reveal whole excerpt and "- Less" link

    # testing tags in box and tag link
    Then I should see "image-processing"
    When I am on "/engagements"
    When I follow "image-processing"
    Then I should be on "/tags/image-processing"

    #TODO: More buttons expand box to reveal whole excerpt and "- Less" link
    #TODO: - Less link collapse box

Scenario: anonymous view of an engagement page
    When I go to "/engagements"
    Then I should see "GPU-accelerated ice sheet flow modeling"
    # This was "When I click ..." with a 10 second wait, but kept failing.  Trying "follow" instead.
    When I follow "GPU-accelerated ice sheet flow modeling"
    And I wait 3 seconds
    Then I should be on "/node/412"
    Then I should see "GPU-accelerated ice sheet flow modeling"
    Then I should see "Institution"
    Then I should see "University of North Dakota"
    Then I should see "Status"
    Then I should see "Sea levels are rising"
    Then I should see "Researcher"
    Then I should see "matlab"
    Then I should see "cuda"
    # TODO test for student & mentor
