describe("test projects/engagements page", () => {

  it("Unauthenticated user Test the Projects/Engagements Page", () => {
    cy.visit('/projects');
    cy.contains('Projects');
    cy.contains('Login to Add New Project');
    cy.contains('Title');
    cy.contains('Project Institution');
    cy.contains('Project Owner');
    cy.contains('Tags');
    cy.contains('Status');
    cy.contains('Project Leader');

    cy.get('input[name="search"]').type('test', { delay: 0 });
    cy.contains('test');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('testy2002', { delay: 0 });
    cy.contains('There are no projects at this time. Please check back often as projects are added regularly.');

    cy.get('input[name="search"]').clear();
    cy.contains('login').click();
    cy.url().should('include', '/tags/login');
  });

});
