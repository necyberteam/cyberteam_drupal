describe("On the Individual CI Link Page for authenticated users", () => {

  it("Authenticated user Test the resource page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/knowledge-base/resources');
    cy.contains('Test CI Link Title');
    cy.get(':nth-child(1) > .views-field > .field-content > .details-wrap > .search-ci-links > .items-center').click();
    cy.contains('login');
    cy.get('img[alt="Beginner"]').should('be.visible');
    cy.contains('Test');
    cy.get(':nth-child(1) > .views-field > .field-content > .details-wrap > .search-ci-links > .grid > .md--col-span-4 > .list-none > .list-image-link > .text-dark-teal')
      .contains('Test')
      .click();
    cy.request('http://example.com').its('status').should('eq', 200);
  });

});
