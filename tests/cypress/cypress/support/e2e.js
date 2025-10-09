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
import 'cypress-axe';

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

// Env-driven gating: by default DO NOT fail the test.
// Later, set CYPRESS_A11Y_FAIL_ON to a comma list (e.g., "serious,critical").
const failOnImpacts = (Cypress.env('A11Y_FAIL_ON') || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

// Helper: run axe, write report, and decide whether to fail.
Cypress.Commands.add('a11yCheckWithReport', (context = null, options = {}) => {
  const includedImpacts = ['minor', 'moderate', 'serious', 'critical']; // all levels initially
  const axeOptions = { includedImpacts, ...options };

  const specPath = Cypress.mocha.getRunner().suite?.file || '';
  const specName = specPath.split(/[\\/]/).pop();
  const safeUrl = (win) => (win?.location?.href || '').replace(/[^a-z0-9]/gi, '_').slice(0, 150);
  let rawResults = null;

  // Use cypress-axe wrapper but capture raw results via custom callback.
  cy.checkA11y(context, axeOptions, (violations) => {
    // violations provided for convenience; we’ll re-run axe.run to get full results object
  }, /* skipFailures = */ true);

  // Grab full results directly from axe for reporting
  cy.window().then(async (win) => {
    // Handle axe.run properly - if context is null, we want to run on document
    let contextElement = context;
    if (context === null) {
      contextElement = win.document;
    }
    const results = await win.axe.run(contextElement, axeOptions);
    rawResults = results;
    const base = `${specName || 'spec'}__${safeUrl(win) || 'page'}`;

    return cy.task('a11y:writeReport', {
      spec: specName,
      url: win.location.href,
      fileBase: base,
      results,
    });
  }).then(({ counts }) => {
    // Log a nice summary
    cy.task('log', `[a11y] Violations — critical:${counts.critical} serious:${counts.serious} moderate:${counts.moderate} minor:${counts.minor}`);

    // Decide whether to fail the test (later phase)
    if (failOnImpacts.length && rawResults) {
      const shouldFail = (rawResults.violations || []).some(v =>
        v.impact && failOnImpacts.includes(v.impact.toLowerCase())
      );
      if (shouldFail) {
        throw new Error(
          `Accessibility violations at disallowed impacts (${failOnImpacts.join(', ')}). See report.`
        );
      }
    }
  });
});
