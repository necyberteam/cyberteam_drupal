/*
* Authenticed user visits the affinity-group page.
*
* Includes joining an affinity group, verifying the
* the ag shows up on the users community-persona page,
* then leaving the affinity group.
*/
describe('Anonymous user visit the affinity-group page', () => {
  it('should find expected stuff', () => {

    cy.loginAs('walnut@pie.org', 'Walnut');
    cy.visit('/affinity_groups');

    cy.get('.js-flag-affinity-group-568')
      .find(':contains("Join")')
      .invoke('attr', 'href')
      .should('contain', '/flag/flag/affinity_group/568?destination=/affinity_groups');

    cy.get('.js-flag-affinity-group-568')
      .find(':contains("Join")')
      .click();

    cy.contains('You have joined this affinity group.')

    cy.visit('/community-persona')//.then(() => {;

    cy.contains("My Affinity Groups")
      .parent()
      .should('contain', 'ACCESS Facilitators');

    cy.visit('/affinity_groups');

    cy.get('.js-flag-affinity-group-568')
      .find(':contains("Leave")')
      .invoke('attr', 'href')
      .should('contain', '/flag/unflag/affinity_group/568?destination=/affinity_groups');

    cy.get('.js-flag-affinity-group-568')
      .find(':contains("Leave")')
      .click();

    cy.contains('You have left this affinity group.')
  });
})
