describe('verify can reach cypress.io & local domain', () => {
  it('checks', () => {
    var url = 'https://example.cypress.io';
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

    url = '/'
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);

  })
})
