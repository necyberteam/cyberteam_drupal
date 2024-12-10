/**
 * Admin user tests members page of an affinity group.
 * Verify the download button, and the members table.
 */
describe("Admin user tests the Individual Affinity Groups", () => {
  it("Should test the Individual Affinity Groups page", () => {

    cy.loginAs('administrator@amptesting.com', 'b8QW]X9h7#5n');

    // got to View Members page
    cy.visit('/affinity-groups/618/users/ACCESS%20Support?nid=327');

    // check the page title
    cy.get('.page-title').contains('ACCESS Support');

    // check breadcrumbs
    const crumbs = [
      ['Support', '/'],
      ['Affinity Groups', '/affinity-groups'],
      ['Affinity Group Members', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    // check download button has correct href.
    cy.get('.btn-primary')
      .contains('Download CSV')
      .should('have.attr', 'href')
      .and('contain', '/affinity-groups/618/users/ACCESS%20Support/csv');

    // check the members table
    cy.get('.views-table').each('tr', (tr) => {

      // check each user has a link to a community-persona page
      cy.get("[headers='view-realname-table-column']")
        .find('a')
        .should('have.attr', 'href')
        .and('contain', '/community-persona');

      // check each user an @ in their email address
      cy.get("[headers='view-mail-table-column']")
        .contains('@');
    });
  });
});
