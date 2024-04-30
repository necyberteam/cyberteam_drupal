//
// Anonymous user visits the affinity-group page
//
describe('Anonymous user visit the affinity-group page', () => {
  it('should find expected stuff', () => {

    cy.visit('/affinity-groups');

    // Verify the request a group button is present and has the correct href
    cy.contains('Request a group')
      .invoke('attr', 'href')
      .should('eq', '/form/affinity-group-request');

    // Verify access-facilitators ag.  First get the table row
    // containing the "access-facilitators" affinity group as an alias:
    cy.get('[alt="The words Campus Champions ACCESS Facilitators"]')
      .parents('tr')
      .as('af-row');

    // 1. verify the image has the correct href
    cy.get('@af-row')
      .find('img')
      .parent()
      .invoke('attr', 'href')
      .should('contain', '/affinity-groups/access-facilitators');

    // 2. verify the text has the correct href
    cy.get('@af-row')
      .contains('ACCESS Facilitators')
      .invoke('attr', 'href')
      .should('contain', '/affinity-groups/access-facilitators');

    // 3. Description: verify text in description
    cy.get('@af-row')
      .contains('People who use or support people who use ACCESS resources and the ACCESS Resource Allocation System.');

    // 4. Verify it has the expected tag
    cy.get('@af-row')
      .get('.square-tags')
      .contains('research-facilitation')
      .invoke('attr', 'href')
      .should('contain', '/tags/research-facilitation');

    // 5. verify the join button for anonymous
    cy.get('@af-row')
      .get('[href="/user/login?destination=/affinity-groups"]')
      .invoke('attr', 'title')
      .should('eq', 'Login to join');
  });
})
