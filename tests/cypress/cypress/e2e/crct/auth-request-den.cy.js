//
// Authenticated user tests the Distributed Experts Network form
//
describe('Authenticated user tests the Distributed Experts Network form', () => {
  it('should submit the form successfully', () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/distributed-experts-network');
    cy.get('.btn').contains('REQUEST A CONSULT')
      .should('have.attr', 'href')
      .and('contain', 'distributed-experts-network-help');
    cy.get('.btn').contains('REQUEST A CONSULT').click();
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

/*
<a class="btn btn-primary" href="http://localhost:32792/form/distributed-experts-network-help">REQUEST A CONSULT</a>
*/
