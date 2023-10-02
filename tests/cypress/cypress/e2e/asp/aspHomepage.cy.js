describe('Homepage AMP Test', () => {
  it('tests amp', () => {
    cy.visit('/')
    cy.contains('Search the ACCESS Universe for answers by typing keywords or phrases.')
  })
})
