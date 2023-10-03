describe('verify reaching local domain', () => {
  it('passes', () => {
    var url = 'https://example.cypress.io';
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

    url = 'http://127.0.0.1:32784/'
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

    url = '/admin'
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

  })
})
