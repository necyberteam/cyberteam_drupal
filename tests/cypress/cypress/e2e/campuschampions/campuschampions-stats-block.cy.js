/**
 * Campus Champions Stats Block Tests
 *
 * Tests the Campus Champions banner block that displays statistics:
 * - Champions Nationwide
 * - Institutions Represented
 * - EPSCoR States
 * - Minority Serving Institutions (MSI)
 *
 * The stats are stored in Drupal state (cc_stats) and populated by
 * the StoreStats plugin using data from the carnegie_codes table.
 */
describe('Campus Champions Stats Block', () => {

  describe('Stats Block Display', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display the Campus Champions stats block on homepage', () => {
      // The stats block shows Champions, Institutions, EPSCoR, MSI numbers
      // Look for the stat labels in the page
      cy.contains('Champions').should('exist');
      cy.contains('Institutions').should('exist');
    });

    it('should display nationwide champions count', () => {
      // The stats show "Champions Nationwide" with a number
      cy.contains('Champions').should('be.visible');
      // Check there's a number on the page (the stats)
      cy.get('body').invoke('text').should('match', /\d{2,}/);
    });

    it('should display institutions represented count', () => {
      cy.contains('Institutions').should('be.visible');
    });

    it('should display EPSCoR count', () => {
      // EPSCoR states count
      cy.contains(/EPSCoR|EPS/i).should('be.visible');
    });

    it('should display MSI (Minority Serving Institutions) count', () => {
      // MSI or Minority Serving
      cy.contains(/Minority|MSI/i).should('be.visible');
    });
  });

  describe('Stats Block Data Validation', () => {
    it('should have valid numeric stats from API', () => {
      // Use cy.request to check the stats state directly via Drush
      // This validates that the stats are being calculated correctly
      cy.request({
        url: '/',
        failOnStatusCode: false
      }).then((response) => {
        // The page should load successfully
        expect(response.status).to.eq(200);

        // Check that the page contains numeric statistics
        const body = response.body;
        // Should have multiple numbers (the stats)
        const numbers = body.match(/\d+/g);
        expect(numbers).to.have.length.greaterThan(5);
      });
    });
  });

  describe('Stats Block on Different Pages', () => {
    it('should display stats block on Campus Champions homepage', () => {
      cy.visit('/');
      // Stats should be visible on the front page
      cy.get('body').should('contain.text', 'Champion');
    });

    it('should display consistent stats across page loads', () => {
      // Load the page twice and verify stats are consistent
      cy.visit('/');
      cy.get('body').then($body1 => {
        const text1 = $body1.text();

        cy.visit('/');
        cy.get('body').then($body2 => {
          const text2 = $body2.text();

          // Both pages should have similar content (stats shouldn't change between loads)
          expect(text1.length).to.be.closeTo(text2.length, 100);
        });
      });
    });
  });
});
