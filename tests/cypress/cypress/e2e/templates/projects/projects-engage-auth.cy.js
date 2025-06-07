describe("test projects page as authenticated user", () => {

  it("Authenticated user Test the Projects Page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/projects');
    cy.contains('Projects');
    cy.contains('Submit New Project');

    cy.get('input[name="search"]').type('test', { delay: 0 });
    cy.wait(2000);
    cy.contains('test');
    cy.contains('test-create-project-title');
    cy.contains('Project Institution');
    cy.contains('Project Owner');
    cy.contains('login');
    cy.contains('Status');
    cy.contains('test-first-name');

    cy.contains('Submit New Project').click();
    cy.url().should('include', '/form/project');
    cy.contains('Project')
  });

  it("verify search filter", () => {
    cy.visit('/projects');
    cy.get('input[name="search"]').type('nothing-should-show', { delay: 0 });
    cy.wait(3000);
    cy.contains('There are no projects at this time.');
  });

});
