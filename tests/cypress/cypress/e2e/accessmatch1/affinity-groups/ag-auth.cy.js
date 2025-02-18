/*
* Authenticated user visits the affinity-group page.
*
* Includes joining an affinity group, verifying the
* the ag shows up on the users community-persona page,
* then leaving the affinity group.
*/
describe('Anonymous user visit the affinity-group page', () => {
  it('should find expected stuff', () => {

    cy.loginAs('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/affinity-groups');

    cy.get('.js-flag-affinity-group-618')
      .find(':contains("Join")')
      .invoke('attr', 'href')
      .should('contain', '/flag/flag/affinity_group/618');

    cy.get('.js-flag-affinity-group-618')
      .find(':contains("Join")')
      .click();

    cy.contains('You have joined this affinity group.')

    cy.visit('/community-persona')

    cy.contains("My Affinity Groups")
      .parent()
      .should('contain', 'ACCESS Support');

    cy.visit('/affinity-groups');

    cy.get('.js-flag-affinity-group-618')
      .find(':contains("Leave")')
      .invoke('attr', 'href')
      .should('contain', '/flag/unflag/affinity_group/618');

    cy.get('.js-flag-affinity-group-618')
      .find(':contains("Leave")')
      .click();

    cy.contains('You have left this affinity group.')
  });
})
