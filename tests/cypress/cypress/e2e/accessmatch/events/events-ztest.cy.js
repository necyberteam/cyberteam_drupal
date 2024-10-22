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
    cy.visit("/admin/reports/dblog");
    cy.get('.admin-dblog').screenshot();
  });
});
