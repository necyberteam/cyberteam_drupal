//
// As an authenticated user, verify auth features for the ci link "cypress-ci-link-for-testing"
//
describe("Authenticated user tests a ci link", () => {
  it("verify auth features of a ci link", () => {
    // login user with the "authenticated" role
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
