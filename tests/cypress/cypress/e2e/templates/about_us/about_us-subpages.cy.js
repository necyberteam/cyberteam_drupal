describe("verify the /about-us subpages as anonymous & authenticated user", () => {
  it("unauthenticated user test About Us menu subpages", () => {
    cy.visit('/about-us/user-guide');
    cy.contains('Welcome to the Cyberteam Portal Users Guide!');
  });

  it("authenticated user tests About Us menu subpages", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/about-us/user-guide');
    cy.contains('Welcome to the Cyberteam Portal Users Guide!');
  });

});
