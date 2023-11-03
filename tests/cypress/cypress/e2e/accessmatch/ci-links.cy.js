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
describe("Unauthenticated user tests the CI Links Page", () => {
  it("Should test the CI Links page for unauthenticated user", () => {
    // first create a dummy ci-links so can reference one of them in the AG.
    create_dummy_ci_link();

    cy.visit("/ci-links");

    //Testing Column Headers
    cy.contains("Votes");
    cy.contains("Title").click();
    cy.contains("Description");
    cy.contains("Category").click();
    cy.contains("Tags");
    cy.contains("Skill Level");
    cy.contains("Affinity Group");
    cy.contains("Category");

    //Skill Level Filter Option
    cy.get(".js-form-item-skill-level-306").contains("Advanced").click();
    cy.get(".alert").contains(
      "There are no CI Links at this time. Please check back often as CI Links are added regularly."
    );
    cy.get(".js-form-item-skill-level-306").contains("Advanced").click();

    //Searching for Cypress Created CI Link
    cy.get("#edit-search--2").type("cypress-ci-link-for-testing");
    cy.get("tbody > :nth-child(1) > .views-field-webform-submission-value-5")
      .contains("cypress-ci-link-for-testing")
      .click();
    cy.get(".page-title").contains("cypress-ci-link-for-testing");
  });
});
