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
  cy.visit('/f64816be-34ca-4d5b-975a-687cb374ddf7');
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
  cy.get('#block-dingo-local-tasks > ul > :nth-child(3) > a').click({ force: true });
  cy.get('[value="Delete"]').click();
});


/**
* Logs a user in by their uid via drush uli.
*/
Cypress.Commands.add('drushUli', () => {
  cy.task('log', 'in drushUli');

  cy.drush('uli', ['--uri=' + Cypress.config('baseUrl')], {})
    .then((result) => {
      cy.task('log', 'result = ' + JSON.stringify(result));
      if (result.code !== 0) {
        throw new Error(result.stderr);
      } else {
        cy.task('log', 'drushUli trying to visit "' + result.stdout + '"');
        cy.visit(result.stdout);
      }
    });
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
  cy.task('log', 'in drush, command = "' + command + '"');
  const ee = `drush ${command} ${stringifyArguments(args)} ${stringifyOptions(options)} -y`;
  cy.task("log", 'in drush, about to exec this:  ' + ee);
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


