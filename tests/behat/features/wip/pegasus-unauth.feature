@wip
@api
@javascript

Feature: test ACCESS Support Pegasus Page

  Scenario: Unauthenticated user tests the Pegasus Page
    Given I am not logged in
    When I go to "/pegasus"
    Then I should see "Automate your workflow"
    Then I should see "ACCESS Pegasus"

    # testing Pegasus logo
    Then I should see an image with alt text "Pegasus logo"

    # testing Documentation button link
    When I follow "Detailed ACCESS Pegasus Documentation"
    Then I should be on "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/129140407/ACCESS+Pegasus"

    # testing Workflow Submit Host button link
    When I am on "/pegasus"
    When I follow "Workflow Submit Host"
    Then I should be on "https://cilogon.org/authorize"

    # testing User Guide button link
    When I am on "/pegasus"
    When I follow "User Guide"
    Then I should be on "https://pegasus.isi.edu/documentation/"

    When I am on "/pegasus"
    Then I should see "Simplify your Research with High Throughput Workflows"
    Then I should see "Pegasus is a workflow management system,"

    # testing Jupyter logo & text
    #Then I should see an image with alt text "Jupyter Notebooks"
    Then I should see "Workflows in Jupyter notebooks"

    # testing Powerful workflow API logo & text
    #Then I should see an image with alt text "Powerful workflow"
    Then I should see "Powerful workflow API"

    # testing HTC logo & text
    #Then I should see an image with alt text "HT Condor"
    Then I should see "Dynamic HTCondor Pools"

    # testing Hosted management environment logo & text
    #Then I should see an image with alt text "Open OnDemand"
    Then I should see "Hosted management environment"

#TODO: Pegasus Video


    Then I should see "LIMITED SCOPE PILOT"
    Then I should see "ACCESS Pegasus Pilot"
    Then I should see "Learn More"
    Then I should see "Use ACCESS Pegasus"

    When I am on "/pegasus"
    When I follow "Workflow Submit Host"
    Then I should be on "https://cilogon.org/authorize?response_type=code&scope=openid%20email%20org.cilogon.userinfo&client_id=cilogon%3A%2Fclient_id%2F57662fc94d2fcfbae1faffc582a30714&state=q3CZYPa9c0jY67v1O32-9BFA2fM&redirect_uri=https%3A%2F%2Faccess.pegasus.isi.edu%2Foidc"

    When I am on "/pegasus"
    When I follow "Example Workflows"
    Then I should be on "https://github.com/pegasus-isi/ACCESS-Pegasus-Examples"

    When I am on "/pegasus"
    When I follow "Learn More"
    Then I should be on "https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/129140407/ACCESS+Pegasus"

    When I am on "/pegasus"
    When I follow "Pegasus Website"
    Then I should be on "https://pegasus.isi.edu/"

    When I am on "/pegasus"
    When I follow "Application Showcase"
    Then I should be on "https://pegasus.isi.edu/application-showcase/"

    #When I am on "https://support.access-ci.org/pegasus"
    #When I follow "Learn More"
    #Then I should be on "https://pegasus.isi.edu/documentation/"
