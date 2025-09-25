//
// Authenticated user requests to join campus champions
//
describe('Authenticated user requests to join campus champions', () => {
  it('should complete successfully', () => {
    cy.loginAs('authenticated@amptesting.com', '6%l7iF}6(4tI').then(() => {
      cy.visit('/form/join-campus-champions');
      // Name fields should be hidden if authenticated already.
      // cy.get("#edit-user-first-name").type("authenticated", { force: true });
      // cy.get("#edit-user-last-name").type("testuser", { force: true });
      cy.get('#edit-letter-of-collaboration-upload').click();
      cy.get('#edit-letter-of-collaboration-upload').selectFile('cypress/fixtures/dummy-file.txt');
      cy.get('#edit-champion-user-type-user-student').check();
      cy.get('#edit-graduation-year').type('2030');
      cy.get('#edit-degree-type-user-undergraduate').check();
      cy.get('#edit-study-field').type('math');
      cy.get('#edit-mentor-name').type('Pecan Pie (201)');
      cy.get('#edit-mentor-email').type('pecan@pie.com');
      cy.get('#edit-carnegie-classification').type('Academy College');
      cy.get('#edit-submit').click();
      cy.contains('Your application to the Campus Champions program was successfully submitted. You should hear from us soon. Thank you!')
    });
  });
});
