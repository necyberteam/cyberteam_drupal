describe("Test logo", () => {

  it("Verify the main icon loads", () => {
    cy.visit('/');
    cy.get('.logo').each(($el) => {
      cy.wrap($el).should('have.attr', 'alt');
    });
  });

});
