describe("Test registration page for becoming a campus champion", () => {
  it("test the proccess of submitting a form to become a student campus champion", () => {
    cy.visit('/form/join-campus-champions');
    cy.contains('Join Campus Champions');
    cy.contains('To join please submit a collaboration letter from your institution using this template.');
    cy.contains('Letter of Collaboration');

    cy.get('#edit-letter-of-collaboration-upload')
      .selectFile('cypress/files/northern-lights.pdf');

    cy.get('input[name="username"]').type('Test');
    cy.get('input[name="user_first_name"]').type('Test');
    cy.get('input[name="user_last_name"]').type('Test');
    cy.get('input[name="user_email"]').type('test@no-reply.com');
    cy.get('#edit-champion-user-type-user-champion').check();
    cy.get('input[name="supervisor_name"]').type('Bob');
    cy.get('input[name="supervisor_email"]').type('bob@no-reply.com');
    cy.get('input[name="carnegie_classification"]').type('167394');
    cy.get('#webform-submission-join-campus-champions-add-form > #edit-actions > #edit-submit').contains('Submit').click();
    cy.contains('Campus Champions Application Submitted');
  });

  it("Delete test account so future runs do not fail", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/admin/people');
    cy.get(':nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();
    cy.get('#edit-delete').click();
    cy.get('#edit-user-cancel-method-user-cancel-delete').check();
    cy.get('#edit-submit').click();
    cy.contains('Account Test Test has been deleted');
  });

});
