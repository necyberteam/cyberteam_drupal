/*  
    This test is specifically focused on the CSSN form page tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Header text,
    Form Functionality 
    
*/

describe("Authenticated user tests the CSSN Page", () => {
  it("Should test CSSN page for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/form/join-the-cssn-network");
    cy.contains("Join the CSSN Network");
    cy.contains("General Member").click();
    cy.get("#edit-actions-submit").click();
    cy.contains("Thanks for updating your CSSN membership.");
    //Testing role update in Community Persona Page?
  });
});
