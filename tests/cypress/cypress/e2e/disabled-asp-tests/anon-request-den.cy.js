//
// Anonymous user tests the Distributed Experts Network form
//
describe('Unauthenticated user tests the Distributed Experts Network form', () => {
  it('should submit the form successfully', () => {
    cy.visit('/distributed-experts-network');
    cy.contains('REQUEST A CONSULT').click();
    cy.url().should('include', '/form/distributed-experts-network-help');
    cy.contains('Distributed Experts Network Help Request Form');
    cy.get('#edit-institution').type('167394');
    cy.get('#edit-my-institution-wasn-t-listed').check();
    cy.contains('Institution');
    cy.get('#edit-my-institution-wasn-t-listed').uncheck();
    cy.get('#edit-please-provide-a-brief-description-of-your-computational-challen').type('Testing');
    cy.get('#edit-what-have-you-tried-so-far-to-solve-this-challenge-').type('testing');
    cy.get('#edit-actions-submit').click();
    cy.contains('New submission added to Distributed Experts Network Help Request Form.');
  });
});
