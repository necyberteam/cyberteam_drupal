describe("verify specific links on homepage", () => {
  it("User is on the homepage", () => {
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.url().should('include', '/contact/northeast_cyberteam');
    cy.contains('Northeast Cyberteam');
  });

  it("Verify the main logo goes to home page", () => {
    cy.visit('/');
    cy.get('.logo').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it("authenticated User is on the homepage", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.url().should('include', '/contact/northeast_cyberteam');
    cy.contains('Northeast Cyberteam')
  });

  it("authenticated Verify the main logo goes to home page", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.get('.logo').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

});
