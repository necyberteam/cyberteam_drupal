@asp
@api
@javascript

Feature: This behat test is for the The About Support Page includes a sub-title
"Make the most of your computing resources" and a page title "About Support."
It features four icons with descriptions for "Share ACCESS Tools," "Knowledge Base,"
"MATCHPlus," and "MATCHPremier," along with sections for "ACCESS OnDemand," "ACCESS Pegasus,"
"Community Knowledge Base," "MATCHPlus," and "MATCHPremier," each with limited scope pilot flags
and relevant button links.

  Scenario: Unauthenticated user tests the About Page
    Given I am not logged in
    When I go to "/about-support"
    Then I should see "About ACCESS Support"
    Then I should see "ACCESS Support Portal"
    Then I should see "The front door for researchers to obtain guided support, services, and"
    #TODO Alt text needs to be added to images
    #TODO How can we test button links if the button has the same name?
    Then I should see "ACCESS Tools"
    Then I should see "OnDemand, Pegasus, and XD Mod—"
    Then I should see "Knowledge Base"
    Then I should see "Crowd-sourced opportunities to meet the needs"
    Then I should see "MATCHPlus"
    Then I should see "Direct support from a mentor/student-facilitator"
    Then I should see "MATCHPremier"
    Then I should see "Embedded expert consultant support for projects of 12-18 months."
    Then I should see "Tag your Content and Help the Community"
    Then I should see "Everything in ACCESS can be tagged. Tagging helps the community find things more"
    Then I should see "We are optimizing our tag system and rolling out functionality. Our tag taxonomy is"
    Then I should see "LIMITED SCOPE PILOT"
    Then I should see "ACCESS OnDemand"
    Then I should see "Centralized ACCESS services for researchers using your resources."
    Then I should see an image with alt text "Woman working with laptop"
    Then I should see "Learn More"
    Then I should see "Find out how to get started with ACCESS OnDemand."
    Then I should see "ACCESS Pegasus"
    Then I should see "The NSF-funded Pegasus workflow management system"
    Then I should see an image with alt text "Researchers on Computers"
    Then I should see "Community Knowledge Base"
    Then I should see "The ACCESS Knowledge Base provides"
    Then I should see an image with alt text "Team looking at screen"
    Then I should see "MATCHPlus"
    Then I should see "If the researchers using your resources need additional assistance"
    Then I should see an image with alt text "Team working together"
    Then I should see "MATCHPremier"
    Then I should see "If a project using your resources needs more support"
    Then I should see an image with alt text "Three people working together"