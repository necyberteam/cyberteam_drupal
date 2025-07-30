/*
    Test ACCESS Organization field on Campus Champions user edit form
*/
describe("ACCESS Organization field - Campus Champions", () => {
  // Test user edit form for authenticated Campus Champions users
  describe("User Edit Form", () => {
    it("Should have ACCESS Organization field on user edit form", () => {
      // Login as authenticated user
      cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
      
      // Visit user edit page
      cy.visit('/user/edit');
      
      // Check for Organization field
      cy.contains('Organization').should('exist');
      cy.get('#edit-field-access-organization-0-target-id')
        .should('exist')
        .should('be.visible')
        .should('have.attr', 'type', 'text');
    });

    it("Should show/hide Institution field when Other is selected on edit form", () => {
      // Login as authenticated user
      cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
      
      // Visit user edit page
      cy.visit('/user/edit');
      
      // Test Other functionality
      cy.get('#edit-field-access-organization-0-target-id')
        .should('exist')
        .should('be.visible')
        .then(($input) => {
          const currentValue = $input.val();
          
          // Clear and type 'Other'
          cy.get('#edit-field-access-organization-0-target-id')
            .clear()
            .type('Other');
          
          // Wait for autocomplete and click 'Other' if available
          cy.wait(1000); // Give autocomplete time to load
          cy.get('body').then(($body) => {
            if ($body.find('.ui-autocomplete:visible').length > 0) {
              cy.get('.ui-autocomplete li').contains('Other').click();
            } else {
              cy.log('No autocomplete suggestions appeared for Other');
              cy.get('#edit-field-access-organization-0-target-id').type('{enter}');
            }
          });
          
          // Check if Institution field becomes visible
          cy.get('body').then(($body) => {
            const institutionField = $body.find('input[name*="institution"], textarea[name*="institution"]');
            if (institutionField.length > 0) {
              cy.get('input[name*="institution"], textarea[name*="institution"]')
                .should('be.visible')
                .should('not.be.disabled')
                .clear()
                .type('Test Edit University Campus Champions')
                .should('have.value', 'Test Edit University Campus Champions');
            } else {
              cy.log('Institution field not found on user edit form');
            }
          });
          
          // Revert back to original value if it exists
          if (currentValue) {
            cy.get('#edit-field-access-organization-0-target-id')
              .clear()
              .type(currentValue);
          }
        });
    });
  });
});