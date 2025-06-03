/*
    CSSN page.

    Anonymous user should see link to login to join the CSSN.

    Authenticated user should be able to join the CSSN.
*/

describe('Tests the CSSN Page', () => {
  it('Test CSSN page for anonymous user', () => {
    cy.visit('/community/cssn')

    //Page Title
    cy.get('.page-title').contains('CSSN')

    // Anonymous user should see link to login to join the CSSN.
    cy.get('.block-cssn-join-form a')
      .contains('Login')
      .should('have.attr', 'href', '/login?destination=/cssn%23join-cssn')
  })

  it("Test CSSN page for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit('/community/cssn')

    // Authenticated user should be able to join the CSSN.
    cy.get('#edit-actions-submit').click();
    cy.contains('Thank you for joining the CSSN.')
  })
})

