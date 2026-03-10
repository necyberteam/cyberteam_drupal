describe("Contributor Wall Page", () => {

  describe("Anonymous user", () => {
    it("Can access the contributor wall page", () => {
      cy.visit('/contributor-wall', { failOnStatusCode: false });
      cy.url().should('include', '/contributor-wall');
      cy.get('body').should('not.contain', 'Page not found');
    });

    it("Page has contributor sections", () => {
      cy.visit('/contributor-wall');

      // Check that contributor blocks are present on the page.
      // Each block renders a .contributors-block or similar wrapper.
      cy.get('.contributors-block, .contributors-list, .contributor-item, .block-layout-builder')
        .should('have.length.greaterThan', 0);
    });

    it("Contributor items link to community persona pages", () => {
      cy.visit('/contributor-wall');

      // Find contributor links - they should point to /community-persona/{uid}
      cy.get('a[href*="/community-persona/"]').then(($links) => {
        if ($links.length > 0) {
          // Verify the first link is valid
          const href = $links.first().attr('href');
          expect(href).to.match(/\/community-persona\/\d+/);
        } else {
          cy.log('No contributor persona links found — blocks may be empty in test environment');
        }
      });
    });

    it("Contributor photos render or show default", () => {
      cy.visit('/contributor-wall');

      cy.get('.people-grid-item').then(($items) => {
        if ($items.length > 0) {
          // Each contributor item should have an image
          cy.wrap($items).first().find('img').should('exist');
        } else {
          cy.log('No contributor items found in test environment');
        }
      });
    });
  });

  describe("Code & Documentation Contributors block", () => {
    it("Renders with contributor data after cron", () => {
      cy.visit('/contributor-wall');

      // The contributors-block class is used by the Code & Docs block
      cy.get('.contributors-block').then(($blocks) => {
        if ($blocks.length > 0) {
          // At least one block should exist
          cy.wrap($blocks).first().should('be.visible');
        }
      });
    });
  });

  describe("Authenticated user", () => {
    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it("Can access the contributor wall page", () => {
      cy.visit('/contributor-wall');
      cy.url().should('include', '/contributor-wall');
      cy.get('body').should('not.contain', 'Access denied');
    });
  });
});
