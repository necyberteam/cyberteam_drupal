@asp
@api
@javascript


Feature: test ACCESS Support Engagements Page

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

#TODO: More buttons expand box to reveal whole excerpt and "- Less" link

    # testing tags in box and tag link
    Then I should see "image-processing"
    When I am on "/engagements"
    When I follow "image-processing"
    Then I should be on "/tags/image-processing"

#TODO: - Less link collapse box
