describe('Authenticated user fills out the enter ticket form', () => {
  it('should submit the form successfully', () => {
    cy.loginAs('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/form/issue');
    cy.contains('Issue');
    cy.contains('Ticket Data');
    cy.contains('Title');
    cy.contains('Region');
    cy.contains('Category');
    cy.contains('Priority');
    cy.contains('Tags');
    cy.contains('Select one (or more) tags that apply.');
    cy.contains('Issue Summary');
    cy.contains('Details');
    cy.contains('Files');
    cy.get('[name="title"]').type('TEST');
    cy.get('[name="region"]').select('At-Large');
    cy.get('[name="category"]').select('Bug report');
    cy.get('[name="priority"]').select('Critical');
    cy.get('[name="details"]').type('TEST');
    // select a couple tags
    cy.get('#edit-tags3-733').check();
    cy.get('#edit-tags3-734').check();
    cy.contains('Submit').click();
    cy.contains('Thank you! Your ticket has been submitted! We\'ll be in touch soon.');
  });
});
