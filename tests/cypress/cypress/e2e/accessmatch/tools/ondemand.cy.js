/*  
    This test is specifically focused on the OnDemand page tested for an unauthenticated user.
    This test checks for major functions like: 
    Headers,
    Text,
        
*/
describe("Unauthenticated user tests the OnDemand Page", () => {
  it("Should test the OnDemand page for unauthenticated user", () => {
    cy.visit("/ondemand");

    //Page Introduction paragraph
    cy.get("#about > .prose").contains(
      "Open OnDemand is an easy-to-use web portal that is being deployed on ACCESS"
    );
    cy.get("#about > .grid > :nth-child(1) > :nth-child(2)").contains(
      "Zero installation"
    );
    cy.get("#about > .grid > :nth-child(1) > :nth-child(2)").contains(
      "Run entirely in your browser."
    );

    //Accordion title and functionality
    cy.get("#ondemand-faq > .colored-square").contains("ACCESS OnDemand FAQ");
    cy.get("#ondemand-faq")
      .contains(
        "What is the difference between ACCESS OnDemand and Open OnDemand?"
      )
      .click();
    cy.get('[style=""] > .bg-white').contains(
      "ACCESS OnDemand is a standardized instance of Open OnDemand"
    );
  });
});
