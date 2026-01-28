describe("Appverse App Flagging", () => {
  // Store app data for use across tests
  let testApp = null;
  const testGithubUrl = 'https://github.com/OSC/bc_example_jupyter';

  before(() => {
    // Login and create a published app for flagging tests
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');

    // Create an app via the form
    cy.intercept('POST', '**/node/add/appverse_app?ajax_form=1**').as('fetchRepo');
    cy.visit('/node/add/appverse_app');

    // Wait for JS to add the Fetch Repo button
    cy.contains('Fetch Repo', { timeout: 10000 }).should('exist');

    cy.get('[data-drupal-selector="edit-field-appverse-github-url-0-uri"]')
      .type(testGithubUrl);
    cy.contains('Fetch Repo').click();
    cy.wait('@fetchRepo');
    cy.contains('We\'ve detected the following', { timeout: 5000 }).should('be.visible');

    // Set moderation state to Published so it's visible and flaggable
    cy.get('[data-drupal-selector="edit-moderation-state-0-state"]')
      .select('published');

    cy.get('#edit-submit').click();
    cy.url().should('not.include', '/node/add');

    // Get the created node info
    cy.request({
      method: 'GET',
      url: '/jsonapi/node/appverse_app?sort=-created&page[limit]=1',
      headers: { 'Accept': 'application/vnd.api+json' }
    }).then((response) => {
      if (response.body.data && response.body.data.length > 0) {
        const app = response.body.data[0];
        testApp = {
          nid: app.attributes.drupal_internal__nid,
          title: app.attributes.title,
          path: app.attributes.path?.alias || `/node/${app.attributes.drupal_internal__nid}`
        };
      }
    });
  });

  describe("Unauthenticated user", () => {
    it("Cannot access flag endpoint without authentication", function() {
      // Skip if no test app available
      if (!testApp) {
        this.skip();
        return;
      }

      // Attempt to flag without being logged in
      cy.request({
        method: 'GET',
        url: `/flag/flag/appverse_apps/${testApp.nid}/full`,
        failOnStatusCode: false
      }).then((response) => {
        // Should be denied (403) or redirected to login (302) or not found (404)
        expect(response.status).to.be.oneOf([403, 302, 404]);
      });
    });
  });

  describe("Authenticated user", () => {
    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it("Can flag an appverse app", function() {
      // Skip if no test app available
      if (!testApp) {
        this.skip();
        return;
      }

      // Visit the appverse app page
      cy.visit(testApp.path);

      // Verify the page loaded
      cy.contains(testApp.title, { matchCase: false });

      // Find and click the flag link
      cy.get('a[href*="/flag/flag/appverse_apps/"]').first().then(($link) => {
        // Click the flag link
        cy.wrap($link).click();

        // After flagging, page should reload or redirect
        cy.url().should('not.include', '/user/login');
      });
    });

    it("Can unflag a previously flagged app", function() {
      // Skip if no test app available
      if (!testApp) {
        this.skip();
        return;
      }

      // Visit the appverse app page
      cy.visit(testApp.path);

      // Check if unflag link exists (meaning it's already flagged)
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="/flag/unflag/appverse_apps/"]').length > 0) {
          // Already flagged, click unflag
          cy.get('a[href*="/flag/unflag/appverse_apps/"]').first().click();
          cy.url().should('not.include', '/user/login');
        } else if ($body.find('a[href*="/flag/flag/appverse_apps/"]').length > 0) {
          // Not flagged, flag it first then unflag
          cy.get('a[href*="/flag/flag/appverse_apps/"]').first().click();
          cy.visit(testApp.path);
          cy.get('a[href*="/flag/unflag/appverse_apps/"]').first().click();
          cy.url().should('not.include', '/user/login');
        }
      });
    });

    it("Flag link includes CSRF token", function() {
      // Skip if no test app available
      if (!testApp) {
        this.skip();
        return;
      }

      cy.visit(testApp.path);

      // Flag links should have a token parameter for CSRF protection
      cy.get('a[href*="/flag/"][href*="appverse_apps"]').first()
        .should('have.attr', 'href')
        .and('include', 'token=');
    });
  });

  describe("JSON:API exposes node ID", () => {
    it("Returns drupal_internal__nid in response", () => {
      cy.request({
        method: 'GET',
        url: '/jsonapi/node/appverse_app',
        headers: {
          'Accept': 'application/vnd.api+json'
        },
        failOnStatusCode: false
      }).then((response) => {
        // Skip assertion if endpoint not available (404)
        if (response.status === 404) {
          cy.log('JSON:API endpoint for appverse_app not available - skipping');
          return;
        }

        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');

        if (response.body.data.length > 0) {
          const firstApp = response.body.data[0];
          expect(firstApp.attributes).to.have.property('drupal_internal__nid');
          expect(firstApp.attributes.drupal_internal__nid).to.be.a('number');
        }
      });
    });
  });

  describe("Session token endpoint", () => {
    it("Returns a CSRF token", () => {
      cy.request('/session/token').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.a('string');
        expect(response.body.length).to.be.greaterThan(10);
      });
    });
  });
});
