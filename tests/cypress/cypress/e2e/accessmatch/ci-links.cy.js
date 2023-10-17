/*  
    This test is specifically focused on an individual CI Links page tested for an unauthenticated user.
    This test checks for major functions like:
    CI link title, 
    CI link description,
    Attached Affinity Group,
    Tags, 
    User engagement information ("0 People found this useful"), 
    CI link category,
    CI link Skill Level,
    verifying images and links load in, 
    and "Login to vote" functionality 
    
*/
describe("Unauthenticated user tests the Individual CI Link Page", () => {
  it("Should test Individual CI Link page for unauthenticated user", () => {
    cy.visit("/ci-links");
    cy.contains("cypress-ci-link-for-testing").click();
    cy.contains("cypress-ci-link-for-testing");
    cy.contains("access-acount");
    cy.contains("finite-element-analysis");
    cy.contains("Dummy description for ci-link 'cypress-ci-link-for-testing'");
    cy.contains("access-acount");
    cy.contains("0 People found this useful");
    cy.contains("Category");
    cy.contains("learning");
    cy.contains("Skill Level");
    cy.contains("Login to vote").click();
    cy.contains("Log in");
  });
});
