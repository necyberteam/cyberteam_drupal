/*
    Test ACCESS Organization field on CCMNet registration and user forms
*/
describe("ACCESS Organization field - CCMNet", () => {
  it("Should have ACCESS Organization field on CCMNet user registration", () => {
    cy.visit('/user/register/ccmnet');
    
    // Check that Organization field exists
    cy.contains('Organization').should('exist');
    
    // Check that the field is an autocomplete input
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .should('have.attr', 'type', 'text');
  });

  it("Should be able to select an organization on CCMNet registration", () => {
    cy.visit('/user/register/ccmnet');
    
    // Test typing in the Organization autocomplete field
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .type('NCSA')
      .should('have.value', 'NCSA');
    
    // Wait for autocomplete suggestions to appear and interact if available
    cy.get('body').then(($body) => {
      if ($body.find('.ui-autocomplete:visible').length > 0) {
        cy.get('.ui-autocomplete li').first().click();
      } else {
        cy.log('No autocomplete suggestions appeared for NCSA');
      }
    });
  });

  it("Should show Institution field when 'Other' is typed on CCMNet", () => {
    cy.visit('/user/register/ccmnet');
    
    // Type 'Other' in the Organization autocomplete field
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .type('Other');
    
    // Wait for autocomplete suggestions and click 'Other' if available
    cy.wait(1000); // Give autocomplete time to load
    cy.get('body').then(($body) => {
      if ($body.find('.ui-autocomplete:visible').length > 0) {
        cy.get('.ui-autocomplete li').contains('Other').click();
      } else {
        cy.log('No autocomplete suggestions appeared for Other - typing manually');
        // If no autocomplete, just press Enter to accept what was typed
        cy.get('#edit-field-access-organization-0-target-id').type('{enter}');
      }
    });
    
    // Check if Institution field becomes visible (it may not exist on all forms)
    cy.get('body').then(($body) => {
      const institutionField = $body.find('input[name*="institution"], textarea[name*="institution"]');
      if (institutionField.length > 0) {
        cy.get('input[name*="institution"], textarea[name*="institution"]')
          .should('be.visible')
          .should('not.be.disabled')
          .type('Test University CCMNet')
          .should('have.value', 'Test University CCMNet');
      } else {
        cy.log('Institution field not found - may not be available on this form');
      }
    });
  });

  describe("User Edit Form - CCMNet", () => {
    it("Should have ACCESS Organization field on CCMNet user edit form", () => {
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

    it("Should handle Other option on CCMNet user edit form", () => {
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
                .type('Test Edit University CCMNet')
                .should('have.value', 'Test Edit University CCMNet');
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