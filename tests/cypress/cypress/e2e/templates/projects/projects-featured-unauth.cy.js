describe("test Featured projects on home page", () => {

  it("Unauthenticated user tests Featured projects on home pag", () => {
    cy.visit('/');
    cy.contains('Featured Projects').click();
    cy.url().should('include', '/projects');
    cy.contains('Recruiting');
    cy.get('input[name="search"]').type('test-create-');
    cy.contains('test-create-recruiting-project-title');
    cy.contains('login');
    cy.contains('test-create-recruiting-project-title').click();
    cy.contains('test-create-recruiting-project-title');
  });

});
