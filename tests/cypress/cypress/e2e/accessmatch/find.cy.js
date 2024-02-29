/*
    Test /find
 */
describe("Test of the /find page", () => {
  it("Should complete successfully", () => {

    cy.visit("/find");

    cy.get('#block-pagetitle').contains("Find Information about ACCESS");

    // check breadcrumbs
    const crumbs = [
      ['Support', '/'],
      ['Find Information about ACCESS', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    cy.get('.button').contains('Search');

    cy.get('.sui-search-box__text-input')
      .type('test{enter}');

    cy.get('.btn').contains('Hide Results');
    cy.get('.sui-paging-info').contains('Showing');
    cy.get('.sui-select').contains('Relevance');
    cy.get('.sui-layout-sidebar').contains('ACCESS Support');
  });
});

