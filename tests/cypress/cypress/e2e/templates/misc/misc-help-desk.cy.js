describe("Verify /help-desk as anonymous, authenticated and admin user", () => {
  it("Verify essential features on code of conduct page", () => {
    cy.visit('/help-desk', { failOnStatusCode: false });
    cy.request('/help-desk').its('status').should('eq', 200);
    cy.url().should('include', 'user/login?destination=/help-desk');
    cy.contains('You must log in to view this page.');
  });

  it("Verify essential features on code of conduct page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/help-desk', { failOnStatusCode: false });
    cy.request({ url: '/help-desk', failOnStatusCode: false }).its('status').should('eq', 403);
    cy.contains('You are not authorized to access this page.');
  });

  it("Admin makes sure Help Desk Page has all major features", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/help-desk');
    cy.contains('Help Desk');
    cy.contains('At-Large');
    cy.contains('All Regions');
  });

});
