@asp
@api
@javascript

Scenerio: both admin and anoynomous users test the /propsoal support page on ACCCESS Support domain

  Feature: admin user tests page
    Given I am logged in
    When I go to /proposal-support
    Then I should see "Propsoal Support"
    Then I should see "Supporting the ACCESS Research Community"
    Then I should see "Latest Announcements"
    Then I should see "Globus and ACCESS Simplify Data Management for Supercomputer Users"
    Then I should see "PEARC Steering Committee Accepting Nominations"
    Then I should see "Open Call: New ML Benchmarks for Scientific Discovery"
    Then I should see "Request for Proposals for Anton 2"
    Then I should see "Deadline Extended for PEARC23 Student Program"
    Then I should see "All Announcements"
    Then I should see "Upcoming Events"
    Then I should see "Expanse: Performance Tuning and Optimization"
    Then I should see "ACES: Introduction to Containers (Charliecloud) Tutorial"
    Then I should see "ACES: Fundamentals of R programming"
    Then I should see "Azure OpenAI for Research"
    Then I should see "All Events"
    Then I should see "What are you looking for?"
    Then I should see "Search the ACCESS Universe"
    Then I should see "SEARCH"
    Then I should see "Browse the Documentation"
    Then I should see "Find helpful user guides"
    Then I should see "Go to Knowldge Base
    Then I should see "Engage with the Community"
    Then I should see "Connect with other researchers"
    Then I should see "join Affinity Groups"
    Then I should see "Still need help?
    Then I should see "Open a Ticket"
    Then i shoudls see "If you. can't find"
    ThenI shoudl see "Create Ticket"
    Then I should see "CCEP Travel Grants and Rewards for your Contributions"
    Then I should see "The CSSN Community"
    Then I should see "Find Out More"
    Then I should see "MATCH Research Support"
    Then I should see "Longer term support engagements"
    Then I should see "MATCHPlus"
    Then I should see "Support for projects of 3-6 months"
    Then I should see "Get help from"
    Then I should see "Modeled on the Northeast and CAREERS Cyberteams Workflow"
    Then I should see "Assistance"
    Then I should see "Work"
    Then I should see "Leverage
    Then I should see "Learn More"
    Then I should see "Long-term Embedded Partnerships"
    Then I should see "MATCHPremier"
    Then I should see "Support for projects of 12-18 months"
    Then I should see "Flexible"
    Then I should see "Arranged"
    Then I should see "Supported"
    Then I should see "Strong"
    Then I should see "Learn More"









Feature: anoynomous user tests page
  Given I am not logged in
  When I go to /proposal-support
  Then I should see "Propsoal Support"
  Then I should see "Supporting the ACCESS Research Community"
  Then I should see "Latest Announcements"
  Then I should see "Globus and ACCESS Simplify Data Management for Supercomputer Users"
  Then I should see "PEARC Steering Committee Accepting Nominations"
  Then I should see "Open Call: New ML Benchmarks for Scientific Discovery"
  Then I should see "Request for Proposals for Anton 2"
  Then I should see "Deadline Extended for PEARC23 Student Program"
  Then I should see "All Announcements"
  Then I should see "Upcoming Events"
  Then I should see "Expanse: Performance Tuning and Optimization"
  Then I should see "ACES: Introduction to Containers (Charliecloud) Tutorial"
  Then I should see "ACES: Fundamentals of R programming"
  Then I should see "Azure OpenAI for Research"
  Then I should see "All Events"
  Then I should see "What are you looking for?"
  Then I should see "Search the ACCESS Universe"
  Then I should see "SEARCH"
  Then I should see "Browse the Documentation"
  Then I should see "Find helpful user guides"
  Then I should see "Go to Knowldge Base
  Then I should see "Engage with the Community"
  Then I should see "Connect with other researchers"
  Then I should see "join Affinity Groups"
  Then I should see "Still need help?
  Then I should see "Open a Ticket"
  Then i shoudls see "If you. can't find"
  ThenI shoudl see "Create Ticket"
  Then I should see "CCEP Travel Grants and Rewards for your Contributions"
  Then I should see "The CSSN Community"
  Then I should see "Find Out More"
  Then I should see "MATCH Research Support"
  Then I should see "Longer term support engagements"
  Then I should see "MATCHPlus"
  Then I should see "Support for projects of 3-6 months"
  Then I should see "Get help from"
  Then I should see "Modeled on the Northeast and CAREERS Cyberteams Workflow"
  Then I should see "Assistance"
  Then I should see "Work"
  Then I should see "Leverage
  Then I should see "Learn More"
  Then I should see "Long-term Embedded Partnerships"
  Then I should see "MATCHPremier"
  Then I should see "Support for projects of 12-18 months"
  Then I should see "Flexible"
  Then I should see "Arranged"
  Then I should see "Supported"
  Then I should see "Strong"
  Then I should see "Learn More"


