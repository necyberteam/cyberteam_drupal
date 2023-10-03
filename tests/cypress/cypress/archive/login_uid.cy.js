describe('Login with a uid', () => {
  it('login with uid', () => {
    // cy.drupalLogout();
    cy.loginUserByUid(1);
    cy.visit('/community-persona');
  })
})


