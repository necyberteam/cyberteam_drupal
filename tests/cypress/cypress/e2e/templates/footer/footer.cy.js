describe("test footer", () => {

  it("User is on the homepage", () => {
    cy.visit('/');
    cy.contains('Funded in part by the National Science Foundation');
    cy.contains('Copyright');
    cy.contains('Privacy Policy');
    cy.contains('Connect.CI');
    cy.contains('Contact Us');
  });

  it("User is on the homepage", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/');
    cy.contains('Funded in part by the National Science Foundation');
    cy.contains('Copyright');
    cy.contains('Privacy Policy');
    cy.contains('Connect.CI');
    cy.contains('Contact Us');
  });

});
