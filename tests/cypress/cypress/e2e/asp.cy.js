describe('Homepage ASP Test', () => {
  it('tests ASP', () => {
    cy.visit('/')
    cy.contains('Advanced Computing Resources for Researchers at Small and Medium Sized Institutions in Northern New England')
  })
})
