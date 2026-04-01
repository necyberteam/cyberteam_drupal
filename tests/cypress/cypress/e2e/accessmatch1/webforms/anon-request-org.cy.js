//
// Anonymous user tests the Organization Request form
//
describe('Test the Organization Request form', () => {
  it('allows unauthenticated user to submit the form', () => {
    cy.visit('/form/organization-request');
    cy.get('#edit-your-name').type('Test');
    cy.get('#edit-your-email').type('test@email.com');
    cy.get('#edit-your-organization').type('Test Organization');
    cy.get('#edit-address-line-1').type('123 Main St');
    cy.get('#edit-city').type('Springfield');
    cy.get('#edit-state-province-region').type('IL');
    cy.get('#edit-zip-postal-code').type('62701');
    cy.get('#edit-country').type('United States');
    cy.get('#edit-organization-webpage').type('https://example.org');
    cy.get('#edit-submit').click();
    cy.contains('Thanks for submitting your request');
  });
});
