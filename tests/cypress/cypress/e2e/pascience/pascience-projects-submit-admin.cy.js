describe("PA Science - add a test project via the form", () => {
  it("Add an in-progress project and verify it is created", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/');
    cy.visit('/projects');
    cy.contains('Submit New Project').click();
    cy.get('#edit-approved-milestones').check();
    cy.get('#edit-approved').check();

    cy.get('#edit-project-title').type('PA Science Test Project');
    cy.get('#edit-region-933').check(); // PA Science region
    cy.get('select[name="status"]').select('In Progress');
    cy.get('#edit-project-leader-first').type('Harry');
    cy.get('#edit-project-leader-last').type('Potter');
    cy.get('#edit-project-description').type('This is a PA Science test project');
    cy.get('#edit-actions-01-submit').click();
    cy.contains('PA Science Test Project');
  });

});
