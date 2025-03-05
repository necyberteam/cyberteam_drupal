describe('Test the registration feature', () => {

  it('Approve registration as admin', () => {
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example')
    cy.wait(1000)
    cy.contains('cypress-example-event').click()
    cy.contains('Register').click()

    cy.get('#edit-submit').click()

    cy.contains('You will receive an email after your registration is approved')
    cy.contains('Approved: No')

    cy.contains('Registrations').click()
    cy.contains('Approve All').click()
    cy.wait(1000)

    cy.contains('Cypress-example-event').click()

    cy.contains('Approved: Yes')
  })

})
