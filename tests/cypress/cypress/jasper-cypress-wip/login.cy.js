//
// As an admin user, create a test CI-Link called "cypress-ci-link-for-testing"
//
describe('Admin user uses form to create a CI Link', () => {
  it('should create a CI-Link', () => {
    // cy.visit('/user/logout');
    cy.visit('/user/login');

    // cy.get('#edit-name').type(username);
    // cy.get('#edit-pass').type(password, {
    //   log: false,
    // });
    // cy.get('.form-submit').contains('Log in').click();
    // // login user with the "administrator" role
    // cy.loginAs('apple@pie.org', 'Apple');
  });
});
