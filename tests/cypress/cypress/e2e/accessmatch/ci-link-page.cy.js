/*  
    This test is specifically focused on the CI Links page tested for an unauthenticated user.
    This test checks for major functions like:
    Search Bar Functionality, 
    Radio Button Functionality,
    Headers,
    Sorting function, 
    Verifying links load in,
    And CI Links go to the correct page 
    
*/
describe("Unauthenticated user tests the CI Link Page", () => {
  it("Should test the CI Link page for unauthenticated user", () => {
    cy.visit("/ci-links");

    cy.contains("Votes").should("be.visible");

    cy.contains("Title").click();

    cy.contains("Description").should("be.visible");

    cy.contains("Category").click();

    cy.contains("Tags").should("be.visible");

    cy.contains("Skill Level").should("be.visible");

    cy.contains("Affinity Group");

    cy.contains("Category").should("be.visible");

    cy.contains("Advanced").click();

    cy.contains(
      "There are no CI Links at this time. Please check back often as CI Links are added regularly."
    ).should("be.visible");

    cy.contains("Advanced").click();

    cy.get("#edit-search--2").type("cypress-ci-link-for-testing");

    cy.contains("cypress-ci-link-for-testing").click();

    cy.contains("cypress-ci-link-for-testing").should("be.visible");
  });
});
