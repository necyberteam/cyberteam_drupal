@templates
@api
@javascript

Feature: test Featured projects on home page

  Scenario: Unauthenticated user tests Featured projects on home page
    Given I am not logged in
    When I am on the homepage
    Then I should see "Featured Projects"
    When I click "Featured Projects"
    Then I should be on "projects"
    When I am on the homepage
    # testing Projects are sorted so “Recruiting” status projects are displayed first
    Then I should see "Recruiting"
    # testing project image
    #Then the image at "img[src=/themes/nect-theme/img/ctportal-logo.jpg]" should load
    Then I should see "test-create-recruiting-project-title"
    Then I should see "login"
    # testing project image
    #Then the image at "img[src=https://greatplains-test.cnct.ci/system/files/webform/project/178/semo-ct.jpg]" should load
    #TODO: link for feature projects is a stretched <a> tag, not actually the title
    #When I click "test-create-recruiting-project-title"
    #Then I should get a "200" HTTP response

