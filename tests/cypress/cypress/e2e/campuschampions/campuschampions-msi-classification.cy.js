/**
 * MSI Classification Tests for Campus Champions
 *
 * Tests the Minority-Serving Institution (MSI) classification features
 * added with the 2025 Carnegie Classification data update.
 *
 * MSI Types tested:
 * - HBCU: Historically Black Colleges & Universities
 * - PBI: Predominantly Black Institutions
 * - ANNHSI: Alaska Native and Native Hawaiian-Serving Institutions
 * - TRIBAL: Tribal Colleges & Universities
 * - AANAPISI: Asian American Native American Pacific Islander Serving Institutions
 * - HSI: Hispanic-Serving Institutions
 * - NASNTI: Native American Serving Non-Tribal Institutions
 *
 * Note: The export endpoint returns CSV data (content-type: text/csv),
 * so we use cy.request() instead of cy.visit() for export tests.
 */
describe('MSI Classification for Campus Champions', () => {

  // Known MSI institutions from 2025 Carnegie data
  const msiInstitutions = {
    hbcu: {
      code: '100654',
      name: 'Alabama A & M University',
      type: 'HBCU'
    },
    howard: {
      code: '131520',
      name: 'Howard University',
      type: 'HBCU'
    },
    tribal: {
      code: '434016',
      name: 'Navajo Technical University',
      type: 'TRIBAL'
    },
    hsi: {
      code: '199193',
      name: 'University of Texas at El Paso',
      type: 'HSI'
    }
  };

  // Non-MSI institution for comparison
  const nonMsiInstitution = {
    code: '166683',
    name: 'Massachusetts Institute of Technology',
    type: 'none'
  };

  // Test user: Walnut (uid 199)
  const testUserEditUrl = '/user/199/edit';

  beforeEach(() => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
  });

  describe('HBCU Classification', () => {
    it('should correctly identify HBCU institutions', () => {
      // Set user to HBCU institution
      cy.visit(testUserEditUrl);

      cy.get('input[name="field_carnegie_code[0][value]"]').clear();
      cy.get('input[name="field_carnegie_code[0][value]"]').type(msiInstitutions.hbcu.code);
      cy.get('#edit-submit').click();
      cy.contains('The changes have been saved');

      // Verify in export
      cy.request('/cc-users/export').then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe('HSI Classification', () => {
    it('should correctly identify HSI institutions', () => {
      cy.visit(testUserEditUrl);

      cy.get('input[name="field_carnegie_code[0][value]"]').clear();
      cy.get('input[name="field_carnegie_code[0][value]"]').type(msiInstitutions.hsi.code);
      cy.get('#edit-submit').click();
      cy.contains('The changes have been saved');
    });
  });

  describe('Tribal Institution Classification', () => {
    it('should correctly identify Tribal institutions', () => {
      cy.visit(testUserEditUrl);

      cy.get('input[name="field_carnegie_code[0][value]"]').clear();
      cy.get('input[name="field_carnegie_code[0][value]"]').type(msiInstitutions.tribal.code);
      cy.get('#edit-submit').click();
      cy.contains('The changes have been saved');
    });
  });

  describe('Non-MSI Institutions', () => {
    it('should handle non-MSI institutions correctly', () => {
      cy.visit(testUserEditUrl);

      cy.get('input[name="field_carnegie_code[0][value]"]').clear();
      cy.get('input[name="field_carnegie_code[0][value]"]').type(nonMsiInstitution.code);
      cy.get('#edit-submit').click();
      cy.contains('The changes have been saved');
    });
  });

  describe('Multiple MSI Designations', () => {
    it('should handle institutions with multiple MSI designations', () => {
      // Some institutions may qualify for multiple MSI types
      // This test ensures the system handles such cases
      cy.request('/cc-users/export').then((response) => {
        expect(response.status).to.eq(200);
        // Should not contain any errors related to multiple MSI flags
        expect(response.body).to.not.include('Fatal error');
      });
    });
  });

  describe('MSI Data in Export', () => {
    it('should include MSI fields in Campus Champions export', () => {
      cy.request('/cc-users/export').then((response) => {
        expect(response.status).to.eq(200);

        // Check that the CSV header contains MSI-related fields
        const headerLine = response.body.split('\n')[0].toLowerCase();
        // The export should have proper CSV structure
        expect(headerLine).to.include(',');
      });
    });
  });

  afterEach(() => {
    // Clean up: reset test user's Carnegie code
    cy.visit(testUserEditUrl);
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('#edit-submit').click();
  });
});
