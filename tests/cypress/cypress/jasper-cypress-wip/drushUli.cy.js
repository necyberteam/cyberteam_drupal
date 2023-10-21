describe('Jasper experiments with cypress', () => {
  it('Messing about with cypress', () => {
    cy.task('log', 'invoking uli, baseUrl = ' + Cypress.config('baseUrl'));
    cy.drushUli();
    cy.visit('/');
    cy.contains('Search the ACCESS Universe for answers by typing keywords or phrases.');
    cy.contains('Log out');
  });
});
