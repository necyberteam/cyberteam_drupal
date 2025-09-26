describe("Request a Group Form test", () => {
  it("Visitor runs through the affinity group page and individual page as admin", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/affinity-groups');
    cy.contains('Request a Group').click()
  });
});
