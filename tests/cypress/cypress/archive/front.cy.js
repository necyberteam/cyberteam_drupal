describe('Loads the front page', () => {
  it('Loads the front page', () => {
    cy.visit('http://localhost:49165/')
    cy.get('h1.page-title')
      .should('exist')
  });
});

