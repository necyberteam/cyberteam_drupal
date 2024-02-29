describe('Test NECT homepage', () => {
  it('Much testing', () => {
    cy.visit('/');
    cy.contains('Advanced Computing Resources for Researchers at Small and Medium Sized Institutions');
  });
});

