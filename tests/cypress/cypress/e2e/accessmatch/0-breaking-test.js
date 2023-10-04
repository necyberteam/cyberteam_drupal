describe('breaking test to trigger slack notification', () => {
  it('checks', () => {
    cy.task("log", "breaking test to trigger slack notification");
    var url = 'https://example.cypress.io';
    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);
    cy.task("log", "looking for text that doesn't exist, should break");
    cy.contains('this-will-break');
  })
})
