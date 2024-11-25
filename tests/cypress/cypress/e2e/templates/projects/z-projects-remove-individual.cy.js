describe("test removing all projects submissions", () => {

  it("Remove all projects and verify empty messages", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('admin/structure/webform/manage/project/results/submissions');
    cy.get('.select-all > .form-checkbox').check({force: true});
    cy.get('select[name="action"]').select('webform_submission_delete_action');
    cy.get('input#edit-apply-above').click();
    cy.get('input[name="confirm_input"]').check();
    cy.get('input#edit-submit').click();
    cy.contains('There are no submissions yet.');
  });


});
