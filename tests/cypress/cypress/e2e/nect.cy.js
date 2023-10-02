describe('Test stuff', () => {
  it('Much testing', () => {
    cy.visit('/');
    cy.contains('Advanced Computing Resources for Researchers at Small and Medium Sized Institutions');
  });
});

