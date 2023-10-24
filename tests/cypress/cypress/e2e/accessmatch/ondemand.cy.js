/*  
    This test is specifically focused on the OnDemand page tested for an unauthenticated user.
    This test checks for major functions like: 
    Headers,
    Text,
        
*/
describe("Unauthenticated user tests the OnDemand Page", () => {
  it("Should test the OnDemand page for unauthenticated user", () => {
    cy.visit("/ondemand");
    cy.contains("Improving the ACCESS Experience");
    cy.contains("Common web-based interfaces integrated with ACCESS services.");
    cy.contains("For Researchers");
    cy.contains("Use OnDemand on these ACCESS allocated resources");
    cy.contains("Learn more about OnDemand");
    cy.contains(
      "ACCESS OnDemand helps computational researchers and students efficiently"
    );
  });
});
