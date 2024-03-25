//
// As an authenticated user, verify auth features for the ci link "cypress-ci-link-for-testing"
//
describe("Authenticated user tests a ci link", () => {
  it("verify auth features of a ci link", () => {
    // first create a dummy ci-links so can reference one of them in the AG.
    create_dummy_ci_link();
    // login user with the "authenticated" role
    cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    //Navigating to cypress created ci link
    cy.visit("/knowledge-base/ci-links");
    cy.get('.view-search-ci-links details summary > div')
      .contains("dummy-ci-link-for-testing-knowledge-base")
      .click()
      .then(() => {
        cy.get('.view-search-ci-links details summary > div')
        // cy.get(":nth-child(2) > .views-field-webform-submission-value-5 > a")
        //   .contains("dummy-ci-link-for-testing-knowledge-base")
        //   .click();
        //Vote feature
        //cy.get(".flag > .flex > .me-2").click();
        //cy.contains("Thanks! Your vote has been recorded.");
        //Flag Feature.When one of the selections in the dropdown is clicked I am brough to an access denied page. Section is disabled for now
        cy.contains("Flag as").click();
        cy.get(".view-search-ci-links details .md--col-span-1 ul li:nth-of-type(2) a").contains("Not useful");
      });
  });
});
// helper function to create a ci-link
function create_dummy_ci_link() {
  cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
  cy.visit("/form/ci-link");
  cy.get("#edit-approved").check();
  cy.get("#edit-title").type("dummy-ci-link-for-testing-knowledge-base");
  cy.get("#edit-category").select("Learning");
  cy.get("#edit-skill-level-304").check(); // beginner level
  cy.get("#edit-description").type(
    "Dummy description for ci-link 'dummy-ci-link-for-testing-knowledge-base'"
  );
  // tag "access-account" is selected
  cy.get(".tags").contains("access-account").click();
  cy.get("#edit-submit").click();
  cy.drupalLogout();
}
