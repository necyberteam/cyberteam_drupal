describe('Login with a uid', () => {
  it('login with uid', () => {
    // cy.drupalLogout();
    cy.drushUli();
    cy.visit('/community-persona');
  })
})


