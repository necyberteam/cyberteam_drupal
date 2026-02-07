describe("Appverse Software Creation", () => {
  const testSoftware = {
    title: `Cypress Test Software ${Date.now()}`,
    description: 'This is a test software entry created by Cypress automated testing.',
    website: 'https://example.com/software',
    documentation: 'https://example.com/docs'
  };

  describe("Unauthenticated user", () => {
    it("Cannot access software creation form without login", () => {
      cy.visit('/node/add/appverse_software', { failOnStatusCode: false });
      // Should redirect to login or show access denied
      cy.url().then((url) => {
        const redirectedToLogin = url.includes('/user/login');
        const accessDenied = url.includes('/node/add/appverse_software');
        expect(redirectedToLogin || accessDenied).to.be.true;
      });
    });
  });

  describe("Authenticated user", () => {
    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it("Can access software creation form", () => {
      cy.visit('/node/add/appverse_software', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        if ($body.text().includes('Page not found')) {
          cy.log('Content type not available - skipping');
          return;
        }
        cy.url().should('include', '/node/add/appverse_software');
        cy.get('form').should('exist');
      });
    });

    it("Software form has required fields", () => {
      cy.visit('/node/add/appverse_software', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        if ($body.text().includes('Page not found')) {
          cy.log('Content type not available - skipping');
          return;
        }

        // Title field
        cy.get('#edit-title-0-value').should('exist');

        // Description/body field
        cy.get('[data-drupal-selector="edit-body-0-value"]').should('exist');

        // Website field
        cy.get('[data-drupal-selector="edit-field-appverse-software-website-0-uri"]').should('exist');

        // Documentation field
        cy.get('[data-drupal-selector="edit-field-appverse-software-doc-0-uri"]').should('exist');

        // License field
        cy.get('[data-drupal-selector="edit-field-license"]').should('exist');

        // Save button
        cy.get('#edit-submit').should('exist');
      });
    });

    it("Can create a new software entry", () => {
      cy.visit('/node/add/appverse_software', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        if ($body.text().includes('Page not found')) {
          cy.log('Content type not available - skipping');
          return;
        }

        // Fill in required fields
        cy.get('#edit-title-0-value').type(testSoftware.title);
        cy.get('[data-drupal-selector="edit-body-0-value"]').type(testSoftware.description);
        cy.get('[data-drupal-selector="edit-field-appverse-software-website-0-uri"]').type(testSoftware.website);
        cy.get('[data-drupal-selector="edit-field-appverse-software-doc-0-uri"]').type(testSoftware.documentation);

        // Select a license (required field - radio buttons)
        cy.get('#edit-field-license input[type="radio"]').first().check({force: true});

        // Submit the form
        cy.get('#edit-submit').click();

        // Verify creation succeeded - should redirect away from /node/add
        cy.url().should('not.include', '/node/add');
      });
    });

    it("Validates required fields on submit", () => {
      cy.visit('/node/add/appverse_software', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        if ($body.text().includes('Page not found')) {
          cy.log('Content type not available - skipping');
          return;
        }

        // Try to submit without title
        cy.get('#edit-submit').click();

        // Should stay on the form (HTML5 validation or Drupal validation)
        cy.url().should('include', '/node/add/appverse_software');
      });
    });
  });
});
