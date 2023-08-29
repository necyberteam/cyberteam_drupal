@asp
@api
@javascript

Feature: verify content of dropdown submenus on the ACCESS Support Homepage

  Scenario: Unauthenticated user sees expected menus & submenus
    Given I am not logged in
    When I am on the homepage
    Then menu "Login" should have links "Login, Questions, Register, Reset Password"
    And menu "ACCESS Menu" (with id="access-additional-universal-menu-menu-link-contentc11952c3-0fdb-48d2-b25e-9e6226f1234b") should have links "About, Announcements, Contact, Events & Trainings, New, Outages, Resource Providers"
    And  menu "Tools" (with id="access-secondary-menu-menu-link-content8109247f-0cc8-4cdb-813d-244abc9979de") should have links "OnDemand, Pegasus, Science Gateway, XDMoD"
    And menu "Knowledge Base" (with id="access-secondary-menu-menu-link-content6de53421-5b9d-4f1a-9b04-c5736c20e02c") should have links "Knowledge Base, Documentation, Q&A Forum, CI Links"
    And menu "MATCHPlus" (with id="access-secondary-menu-menu-link-contente65eb494-52ba-4859-af62-ac4c9fb8a37d") should have links "Overview, Engagements"
    And menu "MATCHPremier" (with id="access-secondary-menu-menu-link-content515b4f5d-95b9-4374-8807-23d8597da44d") should have links ""
    And menu "Community" (with id="access-secondary-menu-menu-link-content9415c0c5-3008-4bac-9605-165fc246e376") should have links "Affinity Groups, CSSN, CCEP Pilot, Community of Communities"

  Scenario: Authenticated user sees expected menus & submenus
    Given I am logged in as a user with the "authenticated" role
    When I am on the homepage
    Then menu "My ACCESS" (with id="access-additional-universal-menu-menu-link-contenta116f3f8-0d73-431e-9d9f-3427c584d7cb") should have links "Allocations, Community Persona, Edit Profile, Publications, Share with ORCID, Logout"

