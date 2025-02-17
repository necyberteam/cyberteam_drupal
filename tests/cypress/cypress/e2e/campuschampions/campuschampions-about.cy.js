describe("test for the become a campus champion page as an authenticated user", () => {
  it("User runs through the become a campus champion page as authenticated", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/about');
    cy.contains('We foster a dynamic environment for the community of research computing');
    cy.get('.text-lg-left > .btn').contains('Join').click();
    cy.url().should('include', '/form/join-campus-champions');
  });
});
