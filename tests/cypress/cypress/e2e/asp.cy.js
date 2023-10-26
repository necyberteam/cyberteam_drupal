describe('Homepage ASP Test', () => {
  it('tests ASP', () => {
    cy.visit('/')
    cy.contains('Not sure which ACCESS infrastructure would be best for you?');
  })
})
