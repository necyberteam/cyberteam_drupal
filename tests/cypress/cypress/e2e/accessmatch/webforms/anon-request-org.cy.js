//
// Anonymous user tests the Organization Request form
//
describe('Test the Organization Request form', () => {
  it('allows unauthenticated user to submit the form', () => {
    cy.visit('/form/organization-request');
    cy.get('#edit-your-name').type('Test');
    cy.get('#edit-your-email').type('test@email.com');
    cy.get('#edit-your-organization').type('Test Organization');
    cy.get('#edit-submit').click();
    cy.contains('Thanks for submitting your request');
  });
});
