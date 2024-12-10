describe("On the KB Resources Page for authenticated users,", () => {

  it("Authenticated user Test the resource page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/knowledge-base/resources');
    cy.contains('Add a Resource');
    cy.contains('Test CI Link Title 2');
    cy.contains('Test CI Link Title');
  });

});
