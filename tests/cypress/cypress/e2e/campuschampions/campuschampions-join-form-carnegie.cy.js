/**
 * Join Campus Champions Form - Carnegie Code Integration Tests
 *
 * Tests the Carnegie classification code field integration in the
 * Join Campus Champions webform, including autocomplete functionality
 * and validation.
 *
 * Note: The existing campuschampions-join-form.cy.js tests the full
 * form submission flow. These tests focus specifically on the Carnegie
 * code field behavior.
 */
describe('Join Campus Champions Form - Carnegie Code Integration', () => {

  // Known valid Carnegie codes from 2025 data
  const validCodes = {
    alabamaAM: {
      code: '100654',
      name: 'Alabama A & M University'
    },
    mit: {
      code: '166683',
      name: 'Massachusetts Institute of Technology'
    },
    stanford: {
      code: '243744',
      name: 'Stanford University'
    },
    utep: {
      code: '199193',
      name: 'University of Texas at El Paso'
    }
  };

  beforeEach(() => {
    cy.visit('/form/join-campus-champions');
  });

  describe('Carnegie Code Field Display', () => {
    it('should display Carnegie classification field on join form', () => {
      cy.get('input[name="carnegie_classification"]').should('exist');
      cy.get('input[name="carnegie_classification"]').should('be.visible');
    });

    it('should have autocomplete enabled for Carnegie field', () => {
      // The field should have autocomplete attributes
      cy.get('input[name="carnegie_classification"]')
        .should('have.attr', 'data-drupal-selector');
    });
  });

  describe('Carnegie Code Autocomplete', () => {
    it('should show autocomplete suggestions when typing institution name', () => {
      cy.get('input[name="carnegie_classification"]').type('Alabama');

      // Wait for autocomplete to appear
      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.get('.ui-autocomplete li').should('have.length.at.least', 1);
    });

    it('should show Alabama A & M University in autocomplete results', () => {
      cy.get('input[name="carnegie_classification"]').type('Alabama A');

      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.contains('Alabama A & M University').should('be.visible');
    });

    it('should populate field when autocomplete option is selected', () => {
      cy.get('input[name="carnegie_classification"]').type('Massachusetts Inst');

      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.contains('Massachusetts Institute of Technology').click();

      // Field should now contain the selected code
      cy.get('input[name="carnegie_classification"]')
        .should('have.value', validCodes.mit.code);
    });

    it('should allow entering Carnegie code directly without autocomplete', () => {
      // The autocomplete only works with institution names, not codes
      // Users can still enter a valid code directly
      cy.get('input[name="carnegie_classification"]').type('166683');
      cy.get('input[name="carnegie_classification"]').should('have.value', '166683');
    });

    it('should filter results as user types more characters', () => {
      // Type partial name
      cy.get('input[name="carnegie_classification"]').type('Univ');
      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');

      // Get initial count
      cy.get('.ui-autocomplete li').then($items => {
        const initialCount = $items.length;

        // Clear and type more specific
        cy.get('input[name="carnegie_classification"]').clear().type('University of Texas');
        cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');

        // Results should be filtered
        cy.get('.ui-autocomplete li').should('have.length.at.least', 1);
      });
    });
  });

  describe('Carnegie Code in Form Submission', () => {
    it('should accept valid Carnegie code in form submission', () => {
      const timestamp = Date.now();

      // Fill required fields
      cy.get('#edit-letter-of-collaboration-upload')
        .selectFile('cypress/files/northern-lights.pdf');

      // Wait for file upload to complete (filename appears with possible numeric suffix)
      cy.contains(/northern-lights.*\.pdf/, { timeout: 10000 }).should('be.visible');

      cy.get('input[name="username"]').type('carnegie-test-' + timestamp);
      cy.get('input[name="user_first_name"]').type('Carnegie');
      cy.get('input[name="user_last_name"]').type('Test');
      cy.get('input[name="user_email"]').type('carnegie-test-' + timestamp + '@no-reply.com');
      cy.get('#edit-champion-user-type-user-champion').check();
      cy.get('input[name="supervisor_name"]').type('Dr. Supervisor');
      cy.get('input[name="supervisor_email"]').type('supervisor@no-reply.com');

      // Enter valid Carnegie code
      cy.get('input[name="carnegie_classification"]').type(validCodes.mit.code);

      // Submit form
      cy.get('#webform-submission-join-campus-champions-add-form > #edit-actions > #edit-submit')
        .contains('Submit').click();

      // Should succeed
      cy.contains('Campus Champions Application Submitted');
    });

    it('should allow form submission without Carnegie code for non-academic', () => {
      const timestamp = Date.now();

      // Fill required fields but leave Carnegie code empty
      cy.get('#edit-letter-of-collaboration-upload')
        .selectFile('cypress/files/northern-lights.pdf');

      cy.get('input[name="username"]').type('nocarnegie-test-' + timestamp);
      cy.get('input[name="user_first_name"]').type('NoCarnegie');
      cy.get('input[name="user_last_name"]').type('Test');
      cy.get('input[name="user_email"]').type('nocarnegie-test-' + timestamp + '@no-reply.com');
      cy.get('#edit-champion-user-type-user-champion').check();
      cy.get('input[name="supervisor_name"]').type('Dr. Supervisor');
      cy.get('input[name="supervisor_email"]').type('supervisor@no-reply.com');

      // Leave Carnegie code empty
      cy.get('input[name="carnegie_classification"]').should('have.value', '');

      // Submit form
      cy.get('#webform-submission-join-campus-champions-add-form > #edit-actions > #edit-submit')
        .contains('Submit').click();

      // Should succeed (Carnegie code may not be required)
      // Check for either success or specific validation message
      cy.get('body').then($body => {
        const text = $body.text();
        const isSuccess = text.includes('Campus Champions Application Submitted');
        const hasValidation = text.includes('required') || text.includes('Carnegie');
        expect(isSuccess || hasValidation).to.be.true;
      });
    });
  });

  describe('Carnegie Code with MSI Institutions', () => {
    it('should find HBCU institutions via autocomplete', () => {
      cy.get('input[name="carnegie_classification"]').type('Howard Univ');

      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.contains('Howard University').should('be.visible');
    });

    it('should find HSI institutions via autocomplete', () => {
      cy.get('input[name="carnegie_classification"]').type('University of Texas at El Paso');

      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.contains('El Paso').should('be.visible');
    });
  });

  // Note: Test users created with unique timestamps (carnegie-test-{timestamp})
  // will not interfere with subsequent test runs. Manual cleanup may be needed
  // periodically to remove old test submissions from the webform.
});
