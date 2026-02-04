/**
 * Carnegie Code Validation Tests for Campus Champions
 *
 * Tests the validation of Carnegie classification codes in user profile forms.
 * Carnegie codes are validated against the carnegie_codes database table which
 * contains 2025 Carnegie Classification data.
 *
 * @see campuschampions_user_form_validate()
 */
describe('Carnegie Code Validation for Campus Champions', () => {

  // Known valid Carnegie codes from the 2025 data
  const validCodes = {
    alabamaAM: '100654',      // Alabama A & M University (HBCU)
    mit: '166683',            // Massachusetts Institute of Technology
    stanford: '243744',       // Stanford University
    howard: '131520'          // Howard University (HBCU)
  };

  // Invalid Carnegie codes (not in database)
  const invalidCodes = {
    random: '999999',
    tooShort: '123',
    letters: 'ABCDEF'
  };

  // Test user: Walnut (uid 199)
  const testUserEditUrl = '/user/199/edit';

  beforeEach(() => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
  });

  it('should accept a valid Carnegie code on user edit form', () => {
    cy.visit(testUserEditUrl);

    // Clear any existing Carnegie code and enter a valid one
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type(validCodes.alabamaAM);
    cy.get('#edit-submit').click();

    // Should save without validation error
    cy.get('.messages--error').should('not.exist');
    cy.contains('The changes have been saved');
  });

  it('should reject an invalid Carnegie code with proper error message', () => {
    cy.visit(testUserEditUrl);

    // Enter an invalid Carnegie code
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type(invalidCodes.random);
    cy.get('#edit-submit').click();

    // Should show validation error
    cy.get('.messages--error').should('exist');
    cy.contains('The Carnegie code "999999" is not valid');
  });

  it('should allow empty Carnegie code for non-academic institutions', () => {
    cy.visit(testUserEditUrl);

    // Clear the Carnegie code field
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('#edit-submit').click();

    // Should save without validation error
    cy.get('.messages--error').should('not.exist');
    cy.contains('The changes have been saved');
  });

  it('should provide autocomplete suggestions for Carnegie codes', () => {
    cy.visit(testUserEditUrl);

    // Type partial code to trigger autocomplete
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type('Alabama');

    // Should show autocomplete suggestions
    cy.get('.ui-autocomplete').should('be.visible');
    cy.get('.ui-autocomplete li').should('have.length.at.least', 1);
  });

  it('should accept Carnegie code selected from autocomplete', () => {
    cy.visit(testUserEditUrl);

    // Use autocomplete to select a valid code
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type('Alabama A');
    cy.get('.ui-autocomplete').should('be.visible');
    cy.get('.ui-autocomplete li').first().click();

    cy.get('#edit-submit').click();

    // Should save without validation error
    cy.get('.messages--error').should('not.exist');
    cy.contains('The changes have been saved');
  });

  it('should validate multiple Carnegie code formats', () => {
    cy.visit(testUserEditUrl);

    // Test that letters-only code is rejected
    cy.get('input[name="field_carnegie_code[0][value]"]').clear();
    cy.get('input[name="field_carnegie_code[0][value]"]').type(invalidCodes.letters);
    cy.get('#edit-submit').click();
    cy.get('.messages--error').should('exist');
  });
});
