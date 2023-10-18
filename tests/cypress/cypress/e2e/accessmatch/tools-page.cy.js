/*  
    This test is specifically focused on the Tools page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title, 
    Page Intro,
    and testing one tool 
    
*/

describe("Unauthenticated user tests the CCEP Details Page", () => {
  it("Should test CCEP Details page for unauthenticated user", () => {
    cy.visit("/tools");
    cy.contains("Tools");
    cy.contains(
      "Try these cutting-edge tools designed to streamline your time to science."
    );
    cy.contains("Utilize remote computing resources easily from any device.");
    cy.contains("Remote access web portal");
    cy.get(":nth-child(3) > div > .btn").click();
    cy.contains("ACCESS OnDemand");
  });
});
