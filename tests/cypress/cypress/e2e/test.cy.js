describe('verify reaching local domain', () => {
  it('passes', () => {
    varurl = 'https://example.cypress.io';
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

    url = 'http://localhost:49260/'
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

    url = '/admin'
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

  })
})
