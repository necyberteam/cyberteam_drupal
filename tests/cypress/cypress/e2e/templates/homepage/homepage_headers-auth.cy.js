describe("For an authenticated user, the Headers include", () => {

  it("Verify the Log Out button links to home page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/');
    cy.contains('Log out').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Log in');
  });

  it("Verify the My profile button", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/');
    cy.contains('My profile').click();
    cy.contains('Edit My Account');
    cy.contains('Add/Edit Interests');
    cy.contains('Add/Edit Skills');
    cy.contains('Change Password');
    cy.contains('Project Submissions');
  });

  it("Verify the Search field works as expected", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/');
    cy.get('#edit-keys').type('asdfasdfasdf');
    cy.get('input[data-drupal-selector="edit-submit"]').contains('Search').click({force: true});
    cy.url().should('include', '/search/node');
    cy.contains('asdfasdfasdf');
    cy.contains('Your search yielded no results');
  });

});
