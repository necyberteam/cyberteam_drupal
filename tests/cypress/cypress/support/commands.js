// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/**
* Logs a user in by their uid via drush uli.
*/
Cypress.Commands.add('drushUli', () => {
  // cy.log('baseUrl = ' + Cypress.env('baseUrl'));

  cy.drush('uli', [], {})
    .its('stdout')
    .then(function (url) {
      cy.log(url);
      cy.visit(url);
    });
});


/**
 * Logs out the user.
 */
Cypress.Commands.add('drupalLogout', () => {
  cy.visit('/user/logout');
})

/**
 * Logs out the user.
 */
Cypress.Commands.add('userLogout', () => {
  cy.visit('/user/logout');
})

/**
 * Logs out the user.
 */
Cypress.Commands.add('userLogin', () => {
  cy.visit('/user/login');
})

/**
* Logs a user in by their uid via drush uli.
*/
Cypress.Commands.add('loginUserByUid', (uid) => {
  cy.drush('user-login', [], {
    uid, uri: 'http://localhost:49165/' /*Cypress.env('baseUrl')*/
  })
    .its('stdout')
    .then(function (url) {
      cy.log(url);
      cy.visit(url);
    });
});

/**
 * Basic user login command. Requires valid username and password.
 *
 * @param {string} username
 *   The username with which to log in.
 * @param {string} password
 *   The password for the user's account.
 */
Cypress.Commands.add('loginAs', (username, password) => {
  // cy.drupalLogout();
  cy.visit('/user/login');
  cy.get('#edit-name')
    .type(username);
  cy.get('#edit-pass').type(password, { log: false, });
  // <input class="btn btn-success mx-1 button js-form-submit form-submit btn btn-primary" data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Log in">
  cy.get('[value="Log in"]').click();
  // cy.get('#edit-submit').contains('Log in').click();
});


/**
 * Defines a cypress command that executes drush commands.
 *
 * Note that our definition of the drush command depends on our environment
 * variable 'drushCommand'. Define this in cypress.json or cypress.env.json
 * based on your local dev setup.
 *
 * We're passing the object containing 'failOnNonZeroExit' to Cypress so that
 * our Cypress tests don't crash if the drush command returns an error (e.g.
 * if we try to delete a user account that does not exist.)
 */
Cypress.Commands.add('drush', (command, args = [], options = {}) => {


  const ee = `lando drush ${command} ${stringifyArguments(args)} ${stringifyOptions(options)} -y`;
  cy.log(ee);
  return cy.exec(ee, { failOnNonZeroExit: false });
});

/**
 * Returns a series of arguments, separated by spaces.
 *
 * @param {*} args
 * @returns
 */
function stringifyArguments(args) {
  return args.join(' ');
}

/**
 * Returns a string from an array of options.
 *
 * @param {array} options
 * @returns
 */
function stringifyOptions(options) {
  return Object.keys(options).map(option => {
    let output = `--${option}`;

    if (options[option] === true) {
      return output;
    }

    if (options[option] === false) {
      return '';
    }

    if (typeof options[option] === 'string') {
      output += `="${options[option]}"`;
    } else {
      output += `=${options[option]}`
    }

    return output;
  }).join(' ')
}

