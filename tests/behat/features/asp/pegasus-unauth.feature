@asp
@api
@javascript

Feature: test ACCESS Support Pegasus Page

  Scenario: Unauthenticated user tests the Pegasus Page
    Given I am not logged in
    When I go to "/pegasus"
    Then I should see "Run Jobs and Workflows on ACCESS Resources from a Single Entry Point"
    Then I should see "About ACCESS Pegasus"

    # testing Pegasus logo
    Then I should see an image with alt text "Pegasus logo"

    # testing Documentation button link
    When I follow "Documentation"
    Then I should get a "200" HTTP response

    # testing Workflow Submit Host button link
    When I am on "/pegasus"
    When I follow "Support"
    Then I should be on "/"

    When I go to "/pegasus"
    Then I should see "Data Management"
    Then I should see an image with alt text "Data Management icon"
    Then I should see "Pegasus handles data transfers,"

    Then I should see "Error Recovery"
    Then I should see an image with alt text "Error Recovery icon"
    Then I should see "Pegasus handles errors by retrying tasks,"

    Then I should see "Provenance Tracking"
    Then I should see an image with alt text "Provenance Tracking icon"
    Then I should see "Pegasus allows users to trace the history of a workflow and its outputs,"

    Then I should see "Heterogeneous Environments"
    Then I should see an image with alt text "Heterogenous Environments icon"
    Then I should see "Pegasus can execute workflows in a variety of distributed computing"

    Then I should see "Reproducibility"
    Then I should see an image with alt text "Reproducibility icon"
    Then I should see "Scientific workflows allow researchers to document"

    Then I should see "Automation"
    Then I should see an image with alt text "Automation icon"
    Then I should see "Workflows automate repetitive and time-consuming tasks,"

    Then I should see "Scalability"
    Then I should see an image with alt text "Scalability icon"
    Then I should see "Workflows scale to handle large data sets and complex analyses,"

    Then I should see "Reusability"
    Then I should see an image with alt text "Reusability icon"
    Then I should see "Workflows can be used to build libraries of reusable code"

    Then I should see "View Workflow Examples"
    Then I should see "We have Jupyter based training notebooks available"
    Then I should see an image with alt text "workflow key"

    Then I should see "Single Job"
    Then I should see an image with alt text "Single job workflow"
    #Multiple Example buttons. How do I specify?
    When I click "Example"
    Then I should get a "200" HTTP response
    When I go to "/pegasus"

    Then I should see "Set of Independent jobs"
    Then I should see an image with alt text "Independent jobs workflow"
    #Multiple Example buttons. How do I specify?
    When I click "Example"
    Then I should get a "200" HTTP response
    When I go to "/pegasus"

    Then I should see "Split/Merge Workflow"
    Then I should see an image with alt text "Split/merge workflow"
    #Multiple Example buttons. How do I specify?
    When I click "Example"
    Then I should get a "200" HTTP response
    When I go to "/pegasus"

    Then I should see "Get Started with ACCESS Pegasus"
    Then I should see "To get started you only need some Python/Jupyter Notebook"
    When I click "Find out about getting an ACCESS Allocation"
    Then I should be on "https://allocations.access-ci.org/"
    When I go to "/pegasus"

    Then I should see "Setup"
    Then I should see "The first time you logon, you need to specify what allocations you have."
    Then I should see an image with alt text "Login to ACCESS"

    Then I should see "Single Sign On with your ACCESS ID"
    Then I should see "All registered users with an active allocation automatically have an ACCESS Pegasus account."

    #Issue with consistency in alt testing
    #Then I should see an image with alt text "SDSC Login Screenshot"

    Then I should see "Configure resources once"
    Then I should see "Use Open OnDemand instance at resource providers to install SSH keys and determine location allocation ID."
    Then I should see "Run Workflows on ACCESS"
    Then I should see an image with alt text "Create the workflow"

    Then I should see an image with alt text "Workflow step 1"
    Then I should see "1. Create the workflow"
    Then I should see "Use Pegasus API in Jupyter Notebook or use our examples"
    Then I should see an image with alt text "Provision compute resources"

    Then I should see an image with alt text "Workflow step 2"
    Then I should see "2. Provision compute resources"
    Then I should see "Use HTCondor Annex tool to provision pilot jobs on your allocated ACCESS resources"
    Then I should see an image with alt text "Monitor the execution"

    Then I should see an image with alt text "Workflow step 3"
    Then I should see "3. Monitor the execution"
    Then I should see "Follow the workflow execution within the notebook or in the terminal"
    When I click "Try it now"
    Then I should be on "/authorize"

    When I go to "/pegasus"
    Then I should see "Tutorial Video"
    Then I should see an image with alt text "Video icon"
    Then I should see "A step by step tutorial video"
    When I click "Watch"
    Then I should be on "/watch?reload=9&v=4wiyLFGwJg4"


    When I go to "/pegasus"
    Then I should see "Documentation"
    Then I should see an image with alt text "Documentation icon"
    Then I should see "Detailed documentation about"
    When I click "Read"
    Then I should get a "200" HTTP response

    When I go to "/pegasus"
    Then I should see "More Help"
    Then I should see an image with alt text "More help icon"
    Then I should see "Links to more help and places to ask questions"
    When I click "Get Help"
    Then I should get a "200" HTTP response

    When I go to "/pegasus"
    Then I should see "Pegasus Affinity Group"
    Then I should see an image with alt text "Pegasus icon"
    Then I should see "The hub for the ACCESS Pegasus"
    When I click "Join us"
    Then I should be on "/affinity-groups/pegasus"

    #When I am on "/pegasus"
    #When I follow "Learn More"
    #Then I should be on "https://pegasus.isi.edu/documentation/"
