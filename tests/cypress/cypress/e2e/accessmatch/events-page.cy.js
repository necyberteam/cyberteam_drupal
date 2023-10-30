/*  
    This test is specifically focused on the Events page tested for an unauthenticated user.
    This test checks for major functions like: 
    Filter Functionality,
    Headers,
    Testing past events
    Testing created event
        
*/
describe("Unauthenticated user tests the Events Page", () => {
  it("Should test the EVents page for unauthenticated user", () => {
    cy.visit("/events");
    cy.contains("Events & Trainings");
    cy.contains("Title");
    cy.contains("Event Date");
    cy.contains("Description");
    cy.get("#edit-field-affiliation-value--2").select("Community");
    //cy.get("#edit-field-affinity-group-target-id-1--2").select("Anvil");
    cy.get("#edit-field-event-type-value--2").select("Training");
    cy.get("#edit-tid--2").select("login");
    cy.get("#edit-field-skill-level-value--2").select("Advanced");
    cy.get("#edit-submit-recurring-events-event-instances--2").click();
    cy.contains("example-event");
    cy.contains("View Past Events").click();
  });
});
