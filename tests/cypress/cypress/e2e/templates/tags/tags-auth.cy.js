describe("Test tags as an authenticated user.", () => {

  it("Tags pages for authenticated user", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/tags');
    cy.contains('Tags');
    cy.contains('Search');
    cy.contains('login');
    cy.contains('osg');
    cy.contains('ACCESS Resources');
    cy.contains('xsede');
  });

  it("Tags pages shows 'Request Tag' for authenticated user", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/tags');
    cy.contains('Request Tag');
  });

  it("Authenticated user searches for tags (case insensitive)", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/tags');
    cy.get('input[name="name"]').type('login', { delay: 0 });
    cy.wait(1000);
    cy.contains('login');
    cy.get('input[name="name"]').clear().type('LOGIN', { delay: 0 });
    cy.wait(1000);
    cy.contains('login');
    cy.get('input[name="name"]').clear().type('LOGIN', { delay: 0 });
    cy.wait(1000);
    cy.contains('login');
    cy.contains('login').click();
    cy.url().should('include', '/tags/login');
    cy.contains('Blog Entries');
  });

});
