describe("Code of Conduct page", () => {
  it("Verify essential features on code of conduct page", () => {
    cy.visit('/connectci-code-of-conduct');
    cy.request('/connectci-code-of-conduct').its('status').should('eq', 200);
    cy.contains('Connect CI Code of Conduct');
    cy.contains('Connect.Cyberinfrastructure is a family of portals,');
    cy.contains('Introduction & Scope');
    cy.contains('This code of conduct should be honored by everyone');
    cy.contains('Standards for Behavior');
    cy.contains('All communication should be appropriate for a professional audience');
    cy.contains('Unacceptable Behavior');
    cy.contains('We, the members of Connect CI, are committed to making participation in this community a harassment-free experience.');
    cy.contains('Reporting Guidelines');
    cy.contains('If you believe someone is violating the code of conduct,');
    cy.contains('How to Submit a Report');
    cy.contains('If you feel your safety is in jeopardy or the situation is an emergency');
    cy.contains('License');
    cy.contains('This code of conduct has been adapted from the US-RSE Association and NumFocus');
  });

});
