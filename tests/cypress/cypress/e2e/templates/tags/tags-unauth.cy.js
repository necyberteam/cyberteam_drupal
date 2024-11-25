describe("Tests for the Tags page with unauthenticated user.  Verify 'Request Tag'", () => {

  it("Tags pages for unauthenticated use", () => {
    cy.visit('/tags');
    cy.contains('Tags');
    cy.contains('Search');
    cy.contains('login');
    cy.contains('osg');
    cy.contains('ACCESS Resources');
    cy.contains('xsede');
  });

  it("Tags pages does not show 'Request Tag' when logged out", () => {
    cy.visit('/tags');
    cy.contains('Request Tag').should('not.be.visible');
  });

  it("Unauthenticated user searches for tags (case insensitive)", () => {
    cy.visit('/tags');
    cy.get('input[name="name"]').type('login'); // Search
    cy.contains('login');
    cy.get('input[name="name"]').clear().type('LOGIN');
    cy.contains('login');
    cy.get('input[name="name"]').clear().type('LOGIN');
    cy.get('.tags-select > a').contains('login').click();
    cy.url().should('include', '/tags/login');
    cy.contains('Blog Entries');
  });

});
