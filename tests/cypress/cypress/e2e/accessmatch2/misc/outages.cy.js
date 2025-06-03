/*
    Verify the outages page.

    <p id="no-all-outages" style="display: none;">Loading all outages...</p>

    cy.get(`span[title="${text}"][role="button"]`).click();
    while (cy.get('div[class="g3-single-select-filter"]').find('i[class="fas fa-spinner fa-pulse"]').length > 0){
        cy.wait(1000);


        https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/all_outages
    }
*/
describe('Anonymous user visit the outages page', () => {
  it('should find expected stuff', () => {

    // setup an intercept call to the outages api
    cy.intercept('https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/all_outages')
      .as('outages-api-call');

    // visit the outages page
    cy.visit('/outages');

    // wait for an api call to complete.  This is a bit of a hack to hopefully
    // mean that the all outages table will be populated.
    cy.wait('@outages-api-call')

    const crumbs = [
      ['Support', '/'],
      ['Outages', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    // by default, there are 10 outages shown.
    cy.get('#outages-all_info').contains('Showing 1 to 10 of');

    // be default, 10 outages are shown.
    cy.get('table[id="outages-all"] > tbody')
      .find('tr').should('have.length', 10);

    // check each row has link to ask.ci
    cy.get('table[id="outages-all"]')
      .find('tr > td:first-child > a')
      .each(($a) => cy.wrap($a)
        .should('have.attr', 'href')
        .and('contain', 'outages?outageID='));

    // Verify the first row of outages.
    cy.get('table[id="outages-all"] > tbody')
      .find('tr')
      .first()
      .as('first-row');

    // 1. verify the first column has a href
    cy.get('@first-row')
      .find('td').eq(0)
      .find('a')
      .should('have.attr', 'href')
      .and('contain', 'outages?outageID=');

    // 2. verify resource has a string
    cy.get('@first-row')
      .find('td').eq(1)
      .should('not.be.empty');

    // 3. verify summary has a string
    cy.get('@first-row')
      .find('td').eq(2)
      .should('not.be.empty');

    // 4. verify Type
    cy.get('@first-row')
      .find('td').eq(3)
      .contains(/full|partial|reconfiguration|degraded/i);

    // 5. verify Start is a string
    cy.get('@first-row')
      .find('td').eq(4)
      .should('not.be.empty');

    // 6. verify End is a string
    //cy.get('@first-row')
    //  .find('td').eq(5)
    //  .should('not.be.empty');

    // change the number of entries to 25
    cy.get('[name="outages-all_length"]').select('25');

    cy.get('#outages-all_info').contains('Showing 1 to 25 of');

  });
});
