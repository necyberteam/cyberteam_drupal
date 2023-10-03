describe('verify reaching local domain', () => {
  it('passes', () => {
    cy.visit('http://localhost:49260/')
  })
})
