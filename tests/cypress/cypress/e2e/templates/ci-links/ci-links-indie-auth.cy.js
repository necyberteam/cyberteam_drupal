describe("On the Individual CI Link Page for authenticated users", () => {

  it("Authenticated user Test the resource page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/knowledge-base/resources');
    cy.contains('Test CI Link Title');
    cy.contains('Test CI Link Title').click();
    cy.contains('login');
    cy.get('img[alt="Beginner"]').should('be.visible');
    cy.contains('Test');
    cy.get('a[href="http://example.com"]:first-child').contains('Test');
  });

});
