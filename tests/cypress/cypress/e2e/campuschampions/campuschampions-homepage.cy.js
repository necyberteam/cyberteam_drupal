describe("verify specific links on homepage", () => {
  it("User is on the homepage", () => {
    cy.visit('/');
    cy.contains('Connect.CI').click();
    cy.contains('Connect.Cyberinfrastructure is a family of portals, each representing a program');
  });

  it("Verify the main logo goes to home page", () => {
    cy.visit('/');
    cy.get('.brand > a').click();
    // Check if baseUrl has a trailing slash and remove it, leads to false negative.
    if (baseUrl.slice(-1) === '/') {
      baseUrl = baseUrl.slice(0, -1);
    }
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it("authenticated User is on the homepage", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('Connect.CI').click();
    cy.url().should('include', '/regions');
    cy.contains('Connect.Cyberinfrastructure is a family of portals, each representing a program');
  });

  it("authenticated Verify the main logo goes to home page", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('Campus Champions').click();
    let baseUrl = Cypress.config().baseUrl;
    // Check if baseUrl has a trailing slash and remove it, leads to false negative.
    if (baseUrl.slice(-1) === '/') {
      baseUrl = baseUrl.slice(0, -1);
    }
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

});
