//
// As an admin user, create a test CI-Link called "cypress-ci-link-for-testing"
//
describe("Admin user uses form to create a CI Link", () => {
  it("should create a CI-Link", () => {
    // login user with the "administrator" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/ci-links");
    cy.contains("cypress-ci-link-for-testing").click();
    cy.contains("Vote for this CI Link").click();
    cy.contains("Thanks! Your vote has been recorded.");
    cy.contains("1");
    cy.contains("Remove your vote for this CI Link").click();
    cy.contains("Your vote has been removed.");
    cy.contains("0");
    cy.contains("Flag this link").click();
  });
});
