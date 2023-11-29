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

    //Page Title
    cy.get(".page-title").contains("Join the CSSN Network");

    //Selecting a CSSN Role
    cy.get("#edit-i-am-joining-as-a-general-member").click();

    //Submit Button and Submission confirmation
    cy.get("#edit-actions-submit").click();
    cy.get(".messages--status").contains(
      "Thanks for updating your CSSN membership."
    );

    //Testing role update in Community Persona Page?
  });
});
