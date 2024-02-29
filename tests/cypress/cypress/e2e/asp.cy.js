describe('Homepage ASP Test', () => {
  it('tests ASP', () => {
    cy.visit('/');
    cy.contains('Getting started with ACCESS');
    cy.task("log", "ASP homepage found & has expected text");
  })
})
