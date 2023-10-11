describe('generic test', () => {
  it('tests the page', () => {


    Cypress.on('viewport:changed', (newValue) => {
      Cypress.config('viewportWidth', newValue.viewportWidth)   // this works
      Cypress.config('viewportHeight', newValue.viewportHeight)
    })

    // it('top screenshot', () => {

    cy.visit('/');

    cy.viewport(1980, 1400)

    const viewportWidth = Cypress.config('viewportWidth')
    cy.task('log', `viewportWidth: ${viewportWidth}`) // viewportWidth: 1000

    cy.then(() => {
      cy.wrap(Cypress.config('viewportWidth')).should('eq', 1280)  // passes
      cy.wrap(Cypress.config('viewportHeight')).should('eq', 720)  // passes
    })
    // })


  })
})
