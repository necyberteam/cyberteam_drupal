describe("verify the /about-us/project-guide as anonymous & authenticated user", () => {
  it("Authenticated user test the project guide", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/about-us/project-guide');
    cy.contains('Project Guide');
    cy.contains('h2', 'Recruiting Students');
    cy.contains('h2', 'Launch Presentation');
    cy.contains('h2', 'Wrap Presentation');
  });

});
