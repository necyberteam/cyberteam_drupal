// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './mailpit-commands'
import 'cypress-axe'
import './axe'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Jasper, 10/3/2023:  Following is necessary when running cypress remotely,
// or javascript errors cause the cypress test to fail.  To see the
// error(s), uncomment the alert(err) line below.
Cypress.on('uncaught:exception', (err, runnable) => {
  // alert(err);  // This allows seeing the error in the browser.
  // returning false here prevents Cypress from failing the test
  return false;
});

