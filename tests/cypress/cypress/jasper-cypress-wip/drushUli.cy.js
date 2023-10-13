describe('Jasper experiments with cypress', () => {
  it('Messing about with cypress', () => {
    // Cypress.config('baseUrl', 'https://accessmatch-local.cnctci.lndo.site');

    cy.task('log', 'invoking uli, baseUrl = ' + Cypress.config('baseUrl'));
    cy.drushUli();
    // // following doesn't visit homepage
    cy.visit('/');
    cy.contains('Search the ACCESS Universe for answers by typing keywords or phrases.');

    // // cy.visit(Cypress.env('baseUrl'));
    cy.contains('Log out');
    // cy.contains('Advanced Computing Resources');
    // cy.task('log', 'invoked uli, checked asp home page');
  });
});
