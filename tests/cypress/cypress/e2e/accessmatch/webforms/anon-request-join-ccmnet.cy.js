//
// Anon user requests to join ccmnet
//
describe('Anon user requests to join ccmnet', () => {
  it('should complete successfully', () => {

    cy.visit('/form/join-ccmnet');
    cy.get('#edit-name-first').type('first');
    cy.get('#edit-name-last').type('last');
    cy.get('#edit-email').type('test@test.com');
    cy.get('#edit-institution').type('test');
    cy.get('#edit-roles-mentee').click();
    cy.get('#edit-roles-mentor').click();
    cy.get('#edit-roles-general-member').click();
    cy.get('#edit-submit').click();
    cy.url().should('contains', 'form/join-ccmnet/confirmation');
    cy.contains('New submission added to Join CCMNet.');
  })
})
