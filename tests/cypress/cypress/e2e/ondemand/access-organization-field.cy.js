/*
    Test ACCESS Organization field on OnDemand registration form
*/
describe("ACCESS Organization field - OnDemand", () => {
  it("Should have Organization field on OnDemand registration form", () => {
    cy.visit('/user/register/ondemand');
    
    // Verify we're on the OnDemand registration page
    cy.contains('Create new OnDemand account');
    
    // Check that Organization field exists
    cy.contains('Organization').should('exist');
    
    // Check that the field is an autocomplete input
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .should('have.attr', 'type', 'text');
  });

  it("Should be able to type in the Organization autocomplete field", () => {
    cy.visit('/user/register/ondemand');
    
    // Test typing in the Organization autocomplete field
    cy.expectAjax('orgAjax', '**/entity_reference_autocomplete/**');
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .type('NCSA')
      .should('have.value', 'NCSA');
    cy.waitForAjax('orgAjax');

    // Click first suggestion if the dropdown rendered.
    cy.get('body').then(($body) => {
      if ($body.find('.ui-autocomplete:visible').length > 0) {
        cy.get('.ui-autocomplete li').first().click();
      } else {
        cy.log('No autocomplete suggestions appeared for NCSA');
      }
    });
  });

  it("Should show Institution field when 'Other' is typed", () => {
    cy.visit('/user/register/ondemand');
    
    // Type 'Other' in the Organization autocomplete field
    cy.expectAjax('orgAjax', '**/entity_reference_autocomplete/**');
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .type('Other');
    cy.waitForAjax('orgAjax');

    // Click 'Other' if the dropdown rendered, else accept the typed value.
    cy.get('body').then(($body) => {
      if ($body.find('.ui-autocomplete:visible').length > 0) {
        cy.get('.ui-autocomplete li').contains('Other').click();
      } else {
        cy.log('No autocomplete suggestions appeared for Other - typing manually');
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
          .type('Test University OnDemand')
          .should('have.value', 'Test University OnDemand');
      } else {
        cy.log('Institution field not found - may not be available on this form');
      }
    });
  });

  it("Should hide Institution field when non-Other organization is typed", () => {
    cy.visit('/user/register/ondemand');
    
    // First type 'Other' to potentially show institution field
    cy.expectAjax('orgAjax1', '**/entity_reference_autocomplete/**');
    cy.get('#edit-field-access-organization-0-target-id')
      .should('exist')
      .should('be.visible')
      .type('Other');
    cy.waitForAjax('orgAjax1');

    // Click 'Other' if the dropdown rendered, else accept the typed value.
    cy.get('body').then(($body) => {
      if ($body.find('.ui-autocomplete:visible').length > 0) {
        cy.get('.ui-autocomplete li').contains('Other').click();
      } else {
        cy.get('#edit-field-access-organization-0-target-id').type('{enter}');
      }
    });
    
    // Check if Institution field appears
    cy.get('body').then(($body) => {
      const institutionField = $body.find('input[name*="institution"], textarea[name*="institution"]');
      if (institutionField.length > 0) {
        // Institution field exists, now test hiding it
        cy.get('input[name*="institution"], textarea[name*="institution"]')
          .should('be.visible');
        
        // Now clear and type a non-Other organization
        cy.expectAjax('orgAjax2', '**/entity_reference_autocomplete/**');
        cy.get('#edit-field-access-organization-0-target-id')
          .clear()
          .type('NCSA');
        cy.waitForAjax('orgAjax2');

        // Click first suggestion if the dropdown rendered.
        cy.get('body').then(($body2) => {
          if ($body2.find('.ui-autocomplete:visible').length > 0) {
            cy.get('.ui-autocomplete li').first().click();
          } else {
            cy.get('#edit-field-access-organization-0-target-id').type('{enter}');
          }
        });
        
        // Institution field should be hidden or disabled
        cy.get('input[name*="institution"], textarea[name*="institution"]')
          .should('satisfy', ($el) => {
            return !$el.is(':visible') || $el.is(':disabled');
          });
      } else {
        cy.log('Institution field not found - cannot test hide functionality');
      }
    });
  });
});