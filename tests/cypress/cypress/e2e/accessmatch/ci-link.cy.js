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
    cy.visit("/ci-links/2");

    cy.contains("ci-link-for-user-200").should("be.visible");

    cy.contains("[webform_submission:values:tags]").should("be.visible");

    cy.contains("0 People found this useful").should("be.visible");

    cy.contains("Category").should("be.visible");

    cy.contains("learning").should("be.visible");

    cy.contains("Skill Level").should("be.visible");

    cy.contains("Login to vote").click();

    cy.contains("Log in").should("be.visible");
  });
});
