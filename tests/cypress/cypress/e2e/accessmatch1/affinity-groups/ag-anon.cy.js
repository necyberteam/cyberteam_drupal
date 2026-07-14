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

    // Verify ACCESS Support Affinity Group.  First get the table row
    // containing the img alt text as an alias:
    cy.get('[alt="Support ACCESS Affinity Group logo"]')
      .parents('tr')
      .as('af-row');

    // 1. verify the image has the correct href
    cy.get('@af-row')
      .find('img')
      .parent()
      .invoke('attr', 'href')
      .should('contain', '/affinity-groups/access-support');

    // 2. verify the text has the correct href
    cy.get('@af-row')
      .contains('ACCESS Support')
      .invoke('attr', 'href')
      .should('contain', '/affinity-groups/access-support');

    // 3. Description: verify text in description
    cy.get('@af-row')
      .contains('Become an ACCESS Support insider by joining our affinity group.');

    // 4. Verify it has the expected tag
    cy.get('@af-row')
      .get('.square-tags')
      .contains('ACCESS-website')
      .invoke('attr', 'href')
      .should('contain', '/tags/access-website');

    // 5. verify the join button for anonymous
    cy.get('@af-row')
      .get('[href="/user/login?destination=/affinity-groups"]')
      .invoke('attr', 'title')
      .should('eq', 'Login to join');

    // Check ai filter. Facets disables the checkboxes while its AJAX
    // request is in flight, so wait for them to be enabled before
    // interacting, and assert on result content (which retries) instead
    // of using fixed waits.
    cy.contains('Show more').click();
    cy.get('#affinity-search-tags-271').should('not.be.disabled').check();
    cy.contains('Anvil');
    cy.contains('ACCESS Support').should('not.exist');
    cy.get('#affinity-search-tags-271').should('not.be.disabled').uncheck();
    // Full list must come back before the search box is used.
    cy.contains('ACCESS Support');

    // Use Search Box — type and trigger BEF auto-submit via input event
    cy.get('#edit-search-api-fulltext--2').should('be.visible').and('not.be.disabled')
      .clear()
      .type('ACCESS RP Integration')
      .trigger('keyup');
    cy.contains('ACCESS RP Integration');
    cy.contains('Anvil').should('not.exist');
    cy.contains('ACCESS Support').should('not.exist');
  });
})
