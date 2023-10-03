describe('Test ASP homepage', () => {
  it('Much testing', () => {
    cy.visit('/');
    cy.contains('Supporting the ACCESS Research Community');
  });
});

