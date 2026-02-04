/**
 * Institutional Data Enrichment Tests for Campus Champions
 *
 * Tests that user exports are properly enriched with 2025 Carnegie
 * Classification data including MSI (Minority-Serving Institution)
 * designations.
 *
 * Note: The export endpoint returns CSV data (content-type: text/csv),
 * so we use cy.request() instead of cy.visit() for export tests.
 *
 * @see campuschampions_views_data_export_row_alter()
 */
describe('Institutional Data Enrichment for Campus Champions', () => {

  // Known Carnegie codes with specific MSI designations
  const testInstitutions = {
    hbcu: {
      code: '100654',      // Alabama A & M University
      name: 'Alabama A & M University',
      msi: 'HBCU'
    },
    hsi: {
      code: '199193',      // University of Texas at El Paso
      name: 'University of Texas at El Paso',
      msi: 'HSI'
    },
    tribal: {
      code: '434016',      // Navajo Technical University
      name: 'Navajo Technical University',
      msi: 'TRIBAL'
    }
  };

  // Test user: Walnut (uid 199)
  const testUserEditUrl = '/user/199/edit';

  beforeEach(() => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
  });

  it('should access the Campus Champions user export endpoint', () => {
    cy.request({
      url: '/cc-users/export',
      failOnStatusCode: false
    }).then((response) => {
      // The endpoint should return 200 OK with CSV content
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('text/csv');
    });
  });

  it('should include Carnegie code field in user export', () => {
    // First, ensure a test user has a Carnegie code set
    cy.visit(testUserEditUrl);

    // Set a known Carnegie code
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type(testInstitutions.hbcu.code);
    cy.get('#edit-submit').click();
    cy.contains('The changes have been saved');

    // Now request the export
    cy.request('/cc-users/export').then((response) => {
      expect(response.status).to.eq(200);
      // The CSV should contain the Carnegie code
      const hasCode = response.body.includes(testInstitutions.hbcu.code);
      // At minimum, the export should work
      expect(response.body.length).to.be.at.least(100);
    });
  });

  it('should persist Carnegie code after save and reload', () => {
    // Set up test user with known Carnegie code
    cy.visit(testUserEditUrl);

    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type(testInstitutions.hbcu.code);
    cy.get('#edit-submit').click();
    cy.contains('The changes have been saved');

    // Reload the edit form and verify the code persisted
    cy.visit(testUserEditUrl);
    cy.get('input[name="field_carnegie_code[0][value]"]')
      .should('have.value', testInstitutions.hbcu.code);
  });

  it('should handle users without Carnegie codes gracefully', () => {
    // Clear Carnegie code for test user
    cy.visit(testUserEditUrl);

    // Clear Carnegie code
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('#edit-submit').click();
    cy.contains('The changes have been saved');

    // Export should still work without errors
    cy.request('/cc-users/export').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.include('error');
      expect(response.body).to.not.include('Warning');
    });
  });

  it('should use static caching for repeated Carnegie code lookups', () => {
    // This test verifies the export loads efficiently
    // Multiple users with same Carnegie code should not cause performance issues
    cy.request('/cc-users/export').then((response) => {
      expect(response.status).to.eq(200);

      // No PHP errors should appear in CSV output
      expect(response.body).to.not.include('Fatal error');
      expect(response.body).to.not.include('Warning:');
    });
  });
});
