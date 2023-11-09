describe('Homepage ASP Test', () => {
  it('tests ASP', () => {
    cy.visit('/');
    cy.verifyImages();
    cy.task("log", "ASP homepage images all load");
  })
})
