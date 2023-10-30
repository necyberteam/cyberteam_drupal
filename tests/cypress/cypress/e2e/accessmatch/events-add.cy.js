/*  
    This test is specifically focused on the Events form tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Header text,
    Form Functionality 

    
    // cy.get("#edit-field-affinity-group-node-0-target-id").type(
    //   "Access Support Testing (413)"
    // );
*/

describe("Authenticated user tests the Events Form without Affinity Group", () => {
  it("Should test Events Form for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    cy.visit("/events/add");
    cy.contains("Create ACCESS Event");
    cy.get("#edit-title-0-value").type("example-event");
    cy.get("#edit-recur-type-custom").click();
    cy.contains("Custom Date(s) and Time(s)");
    cy.get("#edit-custom-date-0-value-date").type("2026-12-12");
    cy.get("#edit-custom-date-0-end-value-date").type("2027-12-12");
    cy.get("#edit-custom-date-0-value-time").type("04:30:00");
    cy.get("#edit-custom-date-0-end-value-time").type("04:30:00");
    cy.get("#edit-field-location-0-value").type("Zoom");
    cy.get("#edit-field-contact-0-value").type("Pecan Pie");
    cy.get("#edit-field-registration-0-uri").type(
      "https://test-accessmatch.pantheonsite.io/"
    );
    cy.get("#edit-field-tags-0-target-id").type("login (682)");
    cy.get("#edit-moderation-state-0-state").select("Published");
    cy.get("#edit-field-event-type").select("Training");
    cy.get("#edit-field-affiliation").select("Community");
    cy.get("#edit-field-skill-level").select("Advanced");
    cy.get("#edit-submit").click();
    cy.contains("Successfully saved the example-event event series");
  });
});
