/**
 * Remove Champion Form Tests
 *
 * Tests the /remove-champion admin form that allows Campus Champions admins
 * to remove users from the Campus Champions program.
 *
 * Access requires: administrator OR campuschampionsadmin role
 *
 * Test users:
 * - pecan@pie.org / Pecan - has campuschampionsadmin role (not administrator)
 * - administrator@amptesting.com - has administrator role
 * - authenticated@amptesting.com - regular authenticated user (no special roles)
 */
describe('Remove Champion Form', () => {

  describe('Access Control', () => {
    it('should deny access to anonymous users', () => {
      cy.visit('/remove-champion', { failOnStatusCode: false });
      // Should redirect to login or show access denied
      cy.url().should('include', '/user/login');
    });

    it('should deny access to regular authenticated users', () => {
      cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
      cy.visit('/remove-champion', { failOnStatusCode: false });
      // Should show access denied
      cy.get('body').then($body => {
        const text = $body.text();
        const isDenied = text.includes('Access denied') ||
                        text.includes('not authorized') ||
                        text.includes('403');
        expect(isDenied).to.be.true;
      });
    });

    it('should allow access to users with campuschampionsadmin role', () => {
      // Pecan Pie has campuschampionsadmin role but NOT administrator
      cy.loginUser('pecan@pie.org', 'Pecan');
      cy.visit('/remove-champion');
      cy.contains('Remove a Campus Champion');
      cy.get('input[data-drupal-selector="edit-champion"]').should('exist');
    });

    it('should allow access to administrators', () => {
      cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
      cy.visit('/remove-champion');
      cy.contains('Remove a Campus Champion');
      cy.get('input[data-drupal-selector="edit-champion"]').should('exist');
    });
  });

  describe('Form Display', () => {
    beforeEach(() => {
      cy.loginUser('pecan@pie.org', 'Pecan');
      cy.visit('/remove-champion');
    });

    it('should display the remove champion form title', () => {
      cy.contains('Remove a Campus Champion');
    });

    it('should have user autocomplete field with correct label', () => {
      cy.contains('Select a person to remove from the Campus Champions program');
      cy.get('input[data-drupal-selector="edit-champion"]').should('exist');
    });

    it('should have autocomplete enabled on the user field', () => {
      cy.get('input[data-drupal-selector="edit-champion"]')
        .should('have.attr', 'data-autocomplete-path');
    });

    it('should have submit button labeled Remove', () => {
      cy.get('input[type="submit"][value="Remove"]').should('exist');
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      cy.loginUser('pecan@pie.org', 'Pecan');
      cy.visit('/remove-champion');
    });

    it('should have required validation on the user field', () => {
      // The field should be marked as required (HTML5 validation)
      cy.get('input[data-drupal-selector="edit-champion"]')
        .should('have.attr', 'required');
    });

    it('should show autocomplete suggestions when typing a name', () => {
      cy.get('input[data-drupal-selector="edit-champion"]').type('admin');
      // Wait for autocomplete dropdown
      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.get('.ui-autocomplete li').should('have.length.at.least', 1);
    });

    it('should validate that selected user is actually a Campus Champion', () => {
      // Select a user who is not a Campus Champion (authenticated test user)
      cy.get('input[data-drupal-selector="edit-champion"]').type('authenticated');
      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.get('.ui-autocomplete li').first().click();

      // Try to submit
      cy.get('input[type="submit"][value="Remove"]').click();

      // Should show validation error that user is not a Campus Champion
      cy.contains('is not a Campus Champion');
    });
  });

  describe('User Autocomplete', () => {
    beforeEach(() => {
      cy.loginUser('pecan@pie.org', 'Pecan');
      cy.visit('/remove-champion');
    });

    it('should find users by partial name match', () => {
      cy.get('input[data-drupal-selector="edit-champion"]').type('test');
      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.get('.ui-autocomplete li').should('have.length.at.least', 1);
    });

    it('should populate field when autocomplete option is selected', () => {
      cy.get('input[data-drupal-selector="edit-champion"]').type('admin');
      cy.get('.ui-autocomplete', { timeout: 10000 }).should('be.visible');
      cy.get('.ui-autocomplete li').first().click();

      // Field should have a value (user name with ID)
      cy.get('input[data-drupal-selector="edit-champion"]')
        .should('not.have.value', '');
    });
  });
});
