describe("Get screenshot for errors", () => {
  it("Get logs", () => {
    // login user with the "authenticated" role
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    cy.visit("/admin/reports/dblog");
    cy.get('.admin-dblog').screenshot();
  });
});
