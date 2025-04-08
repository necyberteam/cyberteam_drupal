describe("verify headers for non-authenticated user", () => {

  it("Verify the Login button links to login flow", () => {
    cy.visit('/');
    cy.contains('My Profile').should('not.exist');
    cy.get('#secondaryNavbarResponsive > .navbar-nav > :nth-child(2) > .nav-link').contains('Log in').click();
    cy.url().should('include', '/user/login');
    cy.contains('Log in');
  });

  it("Verify the Join button links to join", () => {
    cy.visit('/');
    cy.contains('Join').click();
    cy.url().should('include', '/user/register');
    cy.contains('Please select an account type below to create');
  });

  it("Verify the Search field works as expected", () => {
    cy.visit('/');
    cy.get('#edit-keys').type('asdfasdfasdf');
    cy.get('input[data-drupal-selector="edit-submit"]').contains('Search').click({force: true});
    cy.url().should('include', '/search/node');
    cy.contains('asdfasdfasdf');
    cy.contains('Your search yielded no results');
  });

});
