describe("Go over the Affinity Groups Page which has the title 'Affinity Groups'", () => {
  it("Unauthenticated user tests the affinity group", () => {
    cy.visit('/affinity-groups');
    cy.contains('Affinity Groups');
    cy.contains('Affinity Group');
    cy.contains('Description');
    cy.contains('Join');
    cy.contains('Request a Group');
  });

  it("Authenticated user tests the affinity group", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/affinity-groups');
    cy.contains('Affinity Groups');
    cy.contains('Affinity Group');
    cy.contains('Description');
    cy.contains('Join');
    cy.contains('Request a Group');
  });

});
