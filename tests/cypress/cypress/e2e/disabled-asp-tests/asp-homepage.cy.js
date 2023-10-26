describe('Homepage ASP Test', () => {
  it('tests ASP', () => {
    cy.visit('/');
    cy.contains('Search the ACCESS Universe for answers by typing keywords or phrases.');
    cy.task("log", "ASP homepage found & has expected text");
  })
})
