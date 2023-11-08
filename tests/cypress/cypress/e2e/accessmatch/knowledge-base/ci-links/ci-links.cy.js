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
    create_dummy_ci_link();
    cy.visit("/ci-links");
    //Testing Column Headers
    cy.contains("Votes");
    cy.contains("Title");
    cy.contains("Description");
    cy.contains("Category");
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
    cy.get("#edit-search--2").type("access-support-ci-link-for-testing");
    cy.get("tbody > :nth-child(1) > .views-field-webform-submission-value-5")
      .contains("access-support-ci-link-for-testing")
      .click()
      .then(() => {
        cy.get(".page-title").contains("access-support-ci-link-for-testing");
      });
  });
});
// helper function to create a ci-link
function create_dummy_ci_link() {
  cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
  cy.visit("/form/ci-link");
  cy.get("#edit-approved").check();
  cy.get("#edit-title").type("access-support-ci-link-for-testing");
  cy.get("#edit-category").select("Learning");
  cy.get("#edit-skill-level-304").check(); // beginner level
  cy.get("#edit-description").type(
    "Dummy description for ci-link 'access-support-ci-link-for-testing'"
  );
  // tag "access-acount" is selected
  cy.get('span[data-tid="733"]').click();
  cy.get("#edit-submit").click();
  cy.drupalLogout();
}
