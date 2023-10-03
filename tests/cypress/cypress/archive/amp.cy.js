describe('My First AMP Test', () => {
  it('tests amp', () => {
    cy.visit('http://localhost:49182/')
    cy.contains('Supporting the ACCESS Research Community')
  })
})
