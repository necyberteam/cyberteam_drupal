/**
 * Add Repository form — Phase 1.6 + 1.7 shape branching.
 *
 * Covers the AJAX preview + Batch submit flow on /node/add/appverse_app,
 * with particular focus on the Phase 1.7 hidden-required-field bug:
 * when shape !== single_app, per-App fields are hidden by #states[visible]
 * AND must NOT trigger "Name of your App field is required" server-side
 * errors on submit. Fix: strip #required at form-build time in
 * hook_form_alter (not from a validate handler — too late).
 * See feedback-drupal-states-quirk memory.
 */

const ADMIN_EMAIL = 'administrator@amptesting.com';
const ADMIN_PASS = 'b8QW]X9h7#5n';

const URL_COLLECTION = 'https://github.com/Sweet-and-Fizzy/appverse-example-collection';
const URL_SINGLEAPP = 'https://github.com/OSC/bc_osc_abaqus';
const URL_EMPTY = 'https://github.com/github/docs';

const URL_INPUT = 'input[name="field_appverse_github_url[0][uri]"]';
const TITLE_INPUT = 'input[name="title[0][value]"]';
const FETCH_BUTTON = ':button:contains("Fetch Repo"), input[type="submit"][value="Fetch Repo"]';
const SAVE_BUTTON = ':button:contains("Save"), input[type="submit"][value="Save"]';

describe('Add Repository form — Phase 1.6 + 1.7 shape branching', () => {
  beforeEach(() => {
    cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
    cy.visit('/node/add/appverse_app', { failOnStatusCode: false });
  });

  // ----- Initial state -----

  it('hides per-App fields on initial page load (before any URL is fetched)', () => {
    cy.get(URL_INPUT).should('be.visible');
    cy.get(FETCH_BUTTON).should('be.visible');
    cy.get(TITLE_INPUT).should('not.be.visible');
    cy.get('[data-drupal-selector="edit-field-license-0-target-id"]').should('not.be.visible');
    cy.get('[data-drupal-selector="edit-field-appverse-app-type"]').should('not.be.visible');
  });

  // ----- Layout regression (Phase 1.7) -----

  it('renders URL field and Fetch button on the same row, no absolute positioning', () => {
    cy.get('.appverse-url-row').then(($row) => {
      // Dump the HTML for diagnosis.
      cy.task('log', '.appverse-url-row HTML:\n' + $row[0].outerHTML.slice(0, 1500));
      cy.task('log', '.appverse-url-row direct children: ' +
        Array.from($row[0].children).map((c) => `<${c.tagName}.${c.className}>`).join(' '));
    });
    cy.get('.appverse-url-row input').then(($url) => {
      cy.get('.appverse-url-row .button').then(($btn) => {
        const urlBottom = $url[0].getBoundingClientRect().bottom;
        const btnBottom = $btn[0].getBoundingClientRect().bottom;
        expect(Math.abs(urlBottom - btnBottom), 'URL field and Fetch button share baseline')
          .to.be.lessThan(8);
        expect(getComputedStyle($url[0]).position).to.not.equal('absolute');
        expect(getComputedStyle($btn[0]).position).to.not.equal('absolute');
      });
    });
  });

  it('has formnovalidate on the Save button (Phase 1.7 client-side fix)', () => {
    cy.get(SAVE_BUTTON).first().should('have.attr', 'formnovalidate');
  });

  // ----- THE PHASE 1.7 REGRESSION -----

  // REGRESSION TEST for the bug found on 2026-05-18 (Phase 1.7): Drupal's
  // server-side required-field validators ran against #required fields
  // that were hidden by #states[visible]. The form rejected the submit
  // with "Name of your App field is required" + similar for App Type
  // and License. Fix: hook_form_alter now strips #required at
  // form-build time on per-App fields when shape !== single_app.
  // Build-time strip is REQUIRED because Drupal's FormValidator walks
  // children before form-level #validate handlers, so unsetting in a
  // validate handler is too late. See [[feedback-drupal-states-quirk]].
  it('submits a Collection URL WITHOUT errors on hidden required fields', () => {
    cy.get(URL_INPUT).type(URL_COLLECTION);
    cy.get(FETCH_BUTTON).first().click();
    // AJAX returns the preview. Wait for the Collection preview frame.
    cy.contains(/Declared Collection|Appverse Example Collection/i, { timeout: 30000 })
      .should('be.visible');
    // Now Save. NO "field is required" messages should appear.
    cy.get(SAVE_BUTTON).first().click();
    cy.get('body').then(($body) => {
      const text = $body.text();
      // Log the full error region so failure output is diagnostic.
      cy.log('Body excerpt:', text.slice(0, 500));
    });
    cy.contains(/Name of your App.*required/i).should('not.exist');
    cy.contains(/App Type.*required/i).should('not.exist');
    cy.contains(/License.*required/i).should('not.exist');
    // Drupal's ood_software__redirect_submit handler sends the editor to
    // /user/<uid>/my-apps after a successful Collection sync. Also accept
    // /batch (legacy redirect) or /collection/... (direct redirect).
    cy.url({ timeout: 30000 }).should('match', /\/(batch|collection|my-apps)\b/);
  });
});
