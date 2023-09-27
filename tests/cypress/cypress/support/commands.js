/**
 * Logs out the user.
 */
Cypress.Commands.add('drupalLogout', () => {
  cy.visit('/user/logout');
})

/**
 * Basic user login command. Requires valid username and password.
 *
 * @param {string} username
 *   The username with which to log in.
 * @param {string} password
 *   The password for the user's account.
 */
Cypress.Commands.add('loginAs', (username, password) => {
  cy.drupalLogout();
  cy.visit('/user/login');
  cy.get('#edit-name')
    .type(username);
  cy.get('#edit-pass').type(password, {
    log: false,
  });
  cy.get('.form-submit').contains('Log in').click();
});

/**
* Logs a user in by their uid via drush uli.
*/
Cypress.Commands.add('loginUserByUid', (uid) => {
  cy.drush('user-login', [], { uid, uri: Cypress.env('baseUrl') })
    .its('stdout')
    .then(function (url) {
      cy.visit(url);
    });
});

/**
* Deletes last node created.
*/
Cypress.Commands.add('deleteLastNode', () => {
  cy.visit('/admin/content');
  cy.get('tbody > :nth-child(1) > .views-field-title > a').click();
  cy.get('#block-dingo-local-tasks > ul > :nth-child(3) > a').click({force: true});
  cy.get('[value="Delete"]').click();
});

