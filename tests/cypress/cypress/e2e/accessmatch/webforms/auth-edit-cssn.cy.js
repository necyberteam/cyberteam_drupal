//
// Authenticated user tests the edit cssn roles webform
//
describe('Authenticated user tests editing cssn roles webform on ACCESS Support domain', () => {
  it('should update user roles successfully', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/form/edit-your-cssn-roles');
    cy.contains('Mentor');
    cy.contains('Student');
    cy.contains('Research Computing Facilitator');
    cy.contains('Research Software Engineer');
    cy.contains('CI Systems Engineer');
    cy.contains('Researcher / Educator');
    cy.get('#edit-roles-mentor').check();
    cy.get('#edit-submit').click();
    cy.contains('Submission updated in Edit your roles.');
    // cy.visit('/community-persona');
    // TODO enable following when community-persona page is updated
    // cy.contains('mentor');
    // cy.contains('student-facilitator');
  });
});
