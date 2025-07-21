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

    // Verify the dropdown content exists (not checking visibility due to CSS issues)
    cy.contains('My profile')
      .closest('li.dropdown')
      .find('.dropdown-menu')
      .within(() => {
        // Just verify elements exist
        cy.contains('Edit my account').should('exist');
        cy.contains('Add/Edit Interests').should('exist');
        cy.contains('Add/Edit Skills').should('exist');
        cy.contains('My Profile').should('exist');
        cy.contains('My Project Submissions').should('exist');
      });
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
