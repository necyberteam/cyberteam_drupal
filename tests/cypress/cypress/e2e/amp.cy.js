describe('Test ASP homepage', () => {
  it('Much testing', () => {
    cy.visit('/');
    cy.contains('Search the ACCESS Universe for answers by typing keywords or phrases. ');
  });
});

