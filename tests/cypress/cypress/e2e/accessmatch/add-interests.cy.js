/*  
    This test is specifically focused on the Interests Page tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Top Level Tag text,
    Adding a Tag Functionality 

    */

describe("Authenticated user tests the Add Interests without adding an Affinity Group", () => {
  it("Should test Add Interests Form for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/add-interest");
    cy.contains("Add Interests");
    cy.contains("ACCESS RPs");
    cy.get(
      ":nth-child(1) > :nth-child(2) > :nth-child(1) > .view-display-id-page_2 > .view-content > .add-interest-list > ul > :nth-child(1) > :nth-child(1) > span > .d-inline-flex > .d-none > .flag > .use-ajax"
    ).click();
    cy.contains("Remove");
  });
});
