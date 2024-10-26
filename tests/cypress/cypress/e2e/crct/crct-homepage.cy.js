/*
    This test is specifically focused on the CCI Homepage tested for an unauthenticated user.
*/
describe("user tests the crct Hompage", () => {
  it("User is on the homepage", () => {
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.url().should('include', 'contact/careers_cyberteam');
    cy.contains('CAREERS Cyberteam').should('be.visible');
  });

  it("Verify the main logo goes to home page", () => {
    cy.visit('/');
    cy.get('.logo').click();
    // Check if baseUrl has a trailing slash and remove it, leads to false negative.
    if (baseUrl.slice(-1) === '/') {
      baseUrl = baseUrl.slice(0, -1);
    }
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it("Authenticated, User is on the homepage", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.url().should('include', 'contact/careers_cyberteam');
    cy.contains('CAREERS Cyberteam').should('be.visible');
  });

  it("Authenticated, Verify the main logo goes to home page", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.get('.logo').click();
    // Check if baseUrl has a trailing slash and remove it, leads to false negative.
    if (baseUrl.slice(-1) === '/') {
      baseUrl = baseUrl.slice(0, -1);
    }
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

});
