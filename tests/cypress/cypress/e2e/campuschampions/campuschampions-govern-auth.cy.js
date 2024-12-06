describe("test for the governance page as an authenticated user", () => {
  it("Vistor runs through the governance page as authenticated.", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/about-us/governance');
    cy.contains('Governance');
    cy.contains('Champions Elected Leadership Team');
    cy.contains('Champions Leadership Team and Staff Alumni');
    cy.contains('Name');
    cy.contains('Institution');
    cy.contains('Position')
  });
});
