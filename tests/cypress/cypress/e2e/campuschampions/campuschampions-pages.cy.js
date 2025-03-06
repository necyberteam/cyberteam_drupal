describe("Make sure pages work", () => {
  it("Make sure some pages work", () => {
    cy.visit('/champions/current-campus-champions');
    cy.contains('Current Campus Champions');
  });

});
