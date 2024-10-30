describe("This test goes over the KB Resources Page, when accessed", () => {

  it("Unauthenticated user tests the KB Resources page", () => {
    cy.visit('/knowledge-base/resources');
    cy.contains('Knowledge Base Resources');
    cy.contains('Test CI Link Title 2');
    cy.contains('Add a Resource');
    cy.contains('Test CI Link Title');
    cy.contains('Add a Resource').click();
    cy.url().should('include', '/user/login?destination=/form/resource');
  });

});
