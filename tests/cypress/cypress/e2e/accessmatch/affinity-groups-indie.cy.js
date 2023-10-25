/*  
    This test is specifically focused on the Individual Affinity Groups page tested for an unauthenticated user.
    This test checks for major functions like: 
    Headers,
    Text,
    
basically test all fields

*/
describe("Unauthenticated user tests the Individual Affinity Groups", () => {
  it("Should test the Individual Affinity Groups for unauthenticated user", () => {
    cy.visit("/affinity-groups/access-support");
    cy.contains("ACCESS Support");
    cy.contains("ACCESS-website");
    cy.contains("community-outreach");
    cy.contains("tickets");
    cy.contains(
      "Become an ACCESS Support insider by joining our affinity group"
    );
    cy.contains("Members get updates about announcements,");
    cy.contains("CI Links");
    cy.contains("Title");
    cy.contains("Tags");
    cy.contains("Ask.CI Recent Topics");
    cy.contains("Topics");
    cy.contains("Last Update");
    cy.contains("Resources for QGIS?");
    cy.contains("05/22/23");
    //Will test created event once test is made
    cy.contains("Upcoming Events");
    cy.contains("No upcoming events.");
    cy.contains("SEE PAST EVENTS");
    //Will test created announcment once test is created
    cy.contains("Announcements");
    cy.contains("No announcements.");
    //coordinators part is sanitized do will need to make pecan pie a coordinator
  });
});
