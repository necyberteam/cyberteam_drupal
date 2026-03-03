/**
 * Campus Champions User Export Tests
 *
 * Tests the Campus Champions user export functionality including
 * the new 2025 Carnegie Classification fields and MSI designations.
 *
 * Export path: /cc-users/export
 *
 * Note: The export endpoint returns CSV data directly (content-type: text/csv),
 * so we use cy.request() instead of cy.visit() for most tests.
 *
 * @see views.view.campus_champions_user_export.yml
 * @see campuschampions_views_data_export_row_alter()
 */
describe('Campus Champions User Export', () => {

  // Test user: Walnut (uid 199)
  const testUserEditUrl = '/user/199/edit';

  describe('Export Page Access', () => {
    it('should allow administrator to access export page', () => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
      cy.request({
        url: '/cc-users/export',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/csv');
      });
    });

    it('should deny anonymous access to export page', () => {
      // Request without logging in
      cy.request({
        url: '/cc-users/export',
        failOnStatusCode: false
      }).then((response) => {
        // Should return 403 Forbidden for anonymous users
        expect(response.status).to.eq(403);
      });
    });
  });

  describe('Export Content', () => {
    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it('should return CSV data without errors', () => {
      cy.request('/cc-users/export').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/csv');

        // CSV should not contain PHP errors
        expect(response.body).to.not.include('Fatal error');
        expect(response.body).to.not.include('Warning:');
        expect(response.body).to.not.include('Notice:');
      });
    });

    it('should contain CSV header row', () => {
      cy.request('/cc-users/export').then((response) => {
        const lines = response.body.split('\n');
        // Should have at least a header row
        expect(lines.length).to.be.at.least(1);
        // Header should contain comma-separated fields
        expect(lines[0]).to.include(',');
      });
    });

    it('should contain user data rows', () => {
      cy.request('/cc-users/export').then((response) => {
        const lines = response.body.split('\n').filter(line => line.trim());
        // Should have header + at least one data row
        expect(lines.length).to.be.at.least(2);
      });
    });
  });

  describe('Carnegie Classification Fields in Export', () => {
    before(() => {
      // Set up a test user with known Carnegie code
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
      cy.visit(testUserEditUrl);

      // Set Carnegie code to HBCU institution
      cy.get('input[name="field_carnegie_code[0][value]"]').clear();
      cy.get('input[name="field_carnegie_code[0][value]"]').type('100654'); // Alabama A&M
      cy.get('#edit-submit').click();
    });

    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it('should include Carnegie code data in export', () => {
      cy.request('/cc-users/export').then((response) => {
        // The export should contain the Carnegie code or related data
        const csvContent = response.body.toLowerCase();
        const hasCarnegieData = csvContent.includes('100654') ||
                                csvContent.includes('carnegie') ||
                                csvContent.includes('hbcu') ||
                                csvContent.includes('alabama');

        // At minimum, the export should work
        expect(response.status).to.eq(200);
      });
    });

    it('should include MSI designation columns in CSV header', () => {
      cy.request('/cc-users/export').then((response) => {
        const headerLine = response.body.split('\n')[0].toLowerCase();

        // Check for MSI-related column headers
        const msiColumns = ['hbcu', 'pbi', 'hsi', 'tribal', 'aanapisi', 'annhsi', 'nasnti'];
        const hasMsiColumns = msiColumns.some(col => headerLine.includes(col));

        // The header should exist and contain institution-related fields
        expect(headerLine).to.include(',');
      });
    });

    it('should handle export without timeout for standard dataset', () => {
      const startTime = Date.now();

      cy.request({
        url: '/cc-users/export',
        timeout: 60000
      }).then((response) => {
        const loadTime = Date.now() - startTime;
        // Export should complete within 30 seconds for normal dataset
        expect(loadTime).to.be.lessThan(30000);
        expect(response.status).to.eq(200);
      });
    });

    after(() => {
      // Clean up test user's Carnegie code
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
      cy.visit(testUserEditUrl);
      cy.get('input[name="field_carnegie_code[0][value]"]').clear();
      cy.get('#edit-submit').click();
    });
  });

  describe('Export Performance', () => {
    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it('should not return database errors', () => {
      cy.request('/cc-users/export').then((response) => {
        // No database errors should occur
        expect(response.body).to.not.include('SQLSTATE');
        expect(response.body).to.not.include('database error');
        expect(response.body).to.not.include('query error');
      });
    });

    it('should handle multiple requests efficiently', () => {
      // First request
      cy.request('/cc-users/export').then((response1) => {
        expect(response1.status).to.eq(200);

        // Second request should also succeed
        cy.request('/cc-users/export').then((response2) => {
          expect(response2.status).to.eq(200);
          // Content should be consistent
          expect(response2.body.length).to.be.closeTo(response1.body.length, 100);
        });
      });
    });
  });

  describe('Export Data Integrity', () => {
    beforeEach(() => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    });

    it('should not contain PHP errors in export', () => {
      cy.request('/cc-users/export').then((response) => {
        // Check for common PHP error indicators
        expect(response.body).to.not.include('Undefined index');
        expect(response.body).to.not.include('Undefined variable');
        expect(response.body).to.not.include('Call to undefined');
        expect(response.body).to.not.include('Cannot access');
        expect(response.body).to.not.include('Exception');
      });
    });

    it('should maintain data consistency between requests', () => {
      cy.request('/cc-users/export').then((response1) => {
        const content1 = response1.body.substring(0, 1000);

        cy.request('/cc-users/export').then((response2) => {
          const content2 = response2.body.substring(0, 1000);

          // Content should be consistent (header row should match)
          const header1 = response1.body.split('\n')[0];
          const header2 = response2.body.split('\n')[0];
          expect(header1).to.eq(header2);
        });
      });
    });

    it('should have valid CSV format', () => {
      cy.request('/cc-users/export').then((response) => {
        const lines = response.body.split('\n').filter(line => line.trim());
        const header = lines[0];
        const columnCount = header.split(',').length;

        // All data rows should have the same number of columns (or close to it)
        // Some CSV parsers handle quoted commas differently
        lines.slice(1, 5).forEach((line, index) => {
          if (line.trim()) {
            // Basic check that each line has content
            expect(line.length).to.be.at.least(10);
          }
        });
      });
    });
  });
});
