/*
    Test /find
    Note: This test can be flaky due to external search service dependencies.
    Added retries to handle intermittent failures.
 */
describe("Test of the /find page", { retries: { runMode: 2, openMode: 0 } }, () => {
  it("Should complete successfully", () => {
    // Increase page load timeout for this heavy page with external search service
    cy.visit("/find", { timeout: 120000 });

    cy.get('#block-pagetitle').contains("Find Information about ACCESS");

    // check breadcrumbs
    const crumbs = [
      ['Support', '/'],
      ['Find Information About ACCESS', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    cy.get('.button').contains('Search');

    cy.get('.sui-search-box__text-input').type('test', { delay: 0 });

    cy.get('.sui-search-box > .button').click();

    // Wait for search results to load with generous timeout for external service
    cy.contains('.btn', 'Hide Results', { timeout: 20000 });
    cy.get('.sui-paging-info').contains('Showing');
    cy.get('.sui-select').contains('Relevance');
    cy.get('.sui-layout-sidebar').contains('ACCESS Support');
  });
});

