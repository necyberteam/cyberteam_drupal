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
      cy.get('#cc-nationwide').should('be.visible')
        .invoke('attr', 'data-value').should('match', /^\d+$/)
        .then(val => expect(Number(val)).to.be.greaterThan(0));
    });

    it('should display institutions represented count', () => {
      cy.get('#cc-institutions').should('be.visible')
        .invoke('attr', 'data-value').should('match', /^\d+$/)
        .then(val => expect(Number(val)).to.be.greaterThan(0));
    });

    it('should display EPSCoR count', () => {
      cy.get('#cc-epscor').should('be.visible')
        .invoke('attr', 'data-value').should('match', /^\d+$/)
        .then(val => expect(Number(val)).to.be.greaterThan(0));
    });

    it('should display MSI (Minority Serving Institutions) count', () => {
      cy.get('#cc-msi').should('be.visible')
        .invoke('attr', 'data-value').should('match', /^\d+$/)
        .then(val => expect(Number(val)).to.be.greaterThan(0));
    });
  });

  describe('Stats Block Data Validation', () => {
    it('should have valid numeric stats', () => {
      cy.visit('/');
      // All four stats should have positive numeric data-values
      ['#cc-nationwide', '#cc-institutions', '#cc-epscor', '#cc-msi'].forEach(id => {
        cy.get(id).invoke('attr', 'data-value')
          .should('match', /^\d+$/)
          .then(val => expect(Number(val)).to.be.greaterThan(0));
      });
    });
  });

  describe('Stats Block on Different Pages', () => {
    it('should display stats block on Campus Champions homepage', () => {
      cy.visit('/');
      cy.get('#cc-nationwide').should('exist');
    });

    it('should display consistent stats across page loads', () => {
      const statIds = ['#cc-nationwide', '#cc-institutions', '#cc-epscor', '#cc-msi'];
      const firstLoadStats = {};

      // Load the page and capture stat data-values
      cy.visit('/');
      statIds.forEach(id => {
        cy.get(id).invoke('attr', 'data-value').then(val => {
          firstLoadStats[id] = val;
        });
      });

      // Reload and verify stats match
      cy.visit('/');
      statIds.forEach(id => {
        cy.get(id).invoke('attr', 'data-value').then(val => {
          expect(val).to.eq(firstLoadStats[id],
            `Stat ${id} should be consistent across page loads`);
        });
      });
    });
  });
});
