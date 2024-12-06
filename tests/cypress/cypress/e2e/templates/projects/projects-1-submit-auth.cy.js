describe("test submit project form", () => {

  it("Authenticated user fills out the submit project form", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/projects');
    cy.contains('Submit New Project').click();
    cy.url().should('include', '/form/project');
    cy.contains('Project Title');
    cy.contains('Program');
    cy.contains('Project Leader');
    cy.contains('First');
    cy.contains('Last');
    cy.contains('Email');
    cy.contains('Mobile Phone');
    cy.contains('Work Phone');
    cy.contains('Ext:');
    cy.contains('Project Information');
    cy.contains('Provide a description of the project and its history, progress, and/or current status.');
    cy.get('input[name="project_title"]').type('TEST');
    cy.get('input[name="region[345]"]').check(); // At-Large
    cy.get('input[name="project_leader[first]"]').type('TEST');
    cy.get('input[name="project_leader[last]"]').type('TEST');
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('TEST@TEST.COM');
    cy.get('textarea[name="project_description"]').type('TEST');
    cy.get('input#edit-actions-01-submit').click();
    cy.contains('TEST');
    cy.contains('Project Information');
    cy.contains('Edit Project');
    cy.contains('Project Status');
    cy.contains('Project Region');
    cy.contains('Submitted By');
    cy.contains('Project Email');
    cy.contains('Project Description')
  });

});
