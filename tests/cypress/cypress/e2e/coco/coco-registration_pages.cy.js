describe("Test registration page", () => {
  it("Verify the Join button links to join", () => {
    cy.visit('/user/register');
    cy.contains('Please select an account type below to create');
    cy.get(".card:last-child a[href='/user/register/representative']:nth-child(1)").click();
    cy.contains('Create new representative account');
  });

});
