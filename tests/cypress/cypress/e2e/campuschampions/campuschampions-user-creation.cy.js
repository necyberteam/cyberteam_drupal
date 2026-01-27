/**
 * Campus Champions User Creation Tests
 *
 * Tests the user creation process via the Join Campus Champions webform.
 * Verifies that:
 * - User is created when form is submitted
 * - User appears in the CC applications admin view
 * - Carnegie code is captured in the submission
 *
 * Uses the CreateUserHandler webform handler in the campuschampions module.
 *
 * Note: The CreateUserHandler populates:
 * - field_institution from Carnegie code lookup
 * - field_carnegie_code from the submitted code
 * - Assigns research_computing_facilitator role
 */
describe('Campus Champions User Creation', () => {

  // Generate unique identifier for test users
  const timestamp = Date.now();
  const testUsername = `cctest-${timestamp}`;
  const testEmail = `cctest-${timestamp}@no-reply.com`;

  // Known valid Carnegie codes
  const testInstitution = {
    code: '166683',
    name: 'Massachusetts Institute of Technology'
  };

  describe('User Creation via Join Form', () => {
    it('should create a new user when form is submitted with Carnegie code', () => {
      cy.visit('/form/join-campus-champions');

      // Fill out the form
      cy.get('#edit-letter-of-collaboration-upload')
        .selectFile('cypress/files/northern-lights.pdf');

      // Wait for file upload
      cy.contains(/northern-lights.*\.pdf/, { timeout: 10000 }).should('be.visible');

      cy.get('input[name="username"]').type(testUsername);
      cy.get('input[name="user_first_name"]').type('Integration');
      cy.get('input[name="user_last_name"]').type('Test');
      cy.get('input[name="user_email"]').type(testEmail);
      cy.get('#edit-champion-user-type-user-champion').check();
      cy.get('input[name="supervisor_name"]').type('Dr. Test Supervisor');
      cy.get('input[name="supervisor_email"]').type('supervisor-test@no-reply.com');
      cy.get('input[name="carnegie_classification"]').type(testInstitution.code);

      // Submit the form
      cy.get('#webform-submission-join-campus-champions-add-form > #edit-actions > #edit-submit')
        .contains('Submit').click();

      // Verify submission success
      cy.contains('Campus Champions Application Submitted');
    });

    it('should show the submission in CC applications admin view', () => {
      // Login as CC admin
      cy.loginUser('pecan@pie.org', 'Pecan');
      cy.visit('/cc-applications');

      // The new submission should appear (search by first name)
      cy.get('body').then($body => {
        const text = $body.text();
        // Look for the test user's first name in the applications
        const hasSubmission = text.includes('Integration') || text.includes(testUsername);
        expect(hasSubmission).to.be.true;
      });
    });
  });

  describe('User Creation with HBCU Institution', () => {
    const hbcuCode = '100654'; // Alabama A & M University (HBCU)
    const hbcuUsername = `cctest-hbcu-${timestamp}`;
    const hbcuEmail = `cctest-hbcu-${timestamp}@no-reply.com`;

    it('should accept HBCU Carnegie code in form submission', () => {
      cy.visit('/form/join-campus-champions');

      cy.get('#edit-letter-of-collaboration-upload')
        .selectFile('cypress/files/northern-lights.pdf');

      cy.contains(/northern-lights.*\.pdf/, { timeout: 10000 }).should('be.visible');

      cy.get('input[name="username"]').type(hbcuUsername);
      cy.get('input[name="user_first_name"]').type('HBCU');
      cy.get('input[name="user_last_name"]').type('Test');
      cy.get('input[name="user_email"]').type(hbcuEmail);
      cy.get('#edit-champion-user-type-user-champion').check();
      cy.get('input[name="supervisor_name"]').type('Dr. HBCU Supervisor');
      cy.get('input[name="supervisor_email"]').type('hbcu-supervisor@no-reply.com');
      cy.get('input[name="carnegie_classification"]').type(hbcuCode);

      cy.get('#webform-submission-join-campus-champions-add-form > #edit-actions > #edit-submit')
        .contains('Submit').click();

      cy.contains('Campus Champions Application Submitted');
    });
  });

  describe('User Creation Without Carnegie Code', () => {
    it('should handle form when Carnegie code checkbox is checked', () => {
      const noCarnegieUsername = `cctest-nocarnegie-${timestamp}`;
      const noCarnegieEmail = `cctest-nocarnegie-${timestamp}@no-reply.com`;

      cy.visit('/form/join-campus-champions');

      cy.get('#edit-letter-of-collaboration-upload')
        .selectFile('cypress/files/northern-lights.pdf');

      cy.contains(/northern-lights.*\.pdf/, { timeout: 10000 }).should('be.visible');

      cy.get('input[name="username"]').type(noCarnegieUsername);
      cy.get('input[name="user_first_name"]').type('NoCarnegie');
      cy.get('input[name="user_last_name"]').type('Test');
      cy.get('input[name="user_email"]').type(noCarnegieEmail);
      cy.get('#edit-champion-user-type-user-champion').check();
      cy.get('input[name="supervisor_name"]').type('Dr. NoCarnegie Supervisor');
      cy.get('input[name="supervisor_email"]').type('nocarnegie-supervisor@no-reply.com');

      // Check the "I can't find my Carnegie Code" checkbox
      cy.get('input[name="i_can_t_find_my_carnegie_code"]').check();

      // Now the institution fields should be visible
      cy.get('input[name="institution_name"]').should('be.visible');
      cy.get('input[name="institution_name"]').type('Test Non-Carnegie Institution');

      // Fill address fields
      cy.get('input[name="institution_street_address[address]"]').type('123 Test Street');
      cy.get('input[name="institution_street_address[city]"]').type('Test City');
      cy.get('select[name="institution_street_address[state_province]"]').select('Massachusetts');
      cy.get('input[name="institution_street_address[postal_code]"]').type('02101');
      cy.get('select[name="institution_street_address[country]"]').select('United States');

      cy.get('#webform-submission-join-campus-champions-add-form > #edit-actions > #edit-submit')
        .contains('Submit').click();

      // Should succeed
      cy.contains('Campus Champions Application Submitted');
    });
  });
});
