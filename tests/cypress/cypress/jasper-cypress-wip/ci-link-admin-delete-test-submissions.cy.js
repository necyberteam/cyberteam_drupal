//
// Remove all test CI-Links called "cypress-ci-link-for-testing".
//
describe('Admin user deletes all cypress-ci-link-for-testing submissions', () => {
  it('should delete all cypress-ci-link-for-testing submissions', () => {
    // login user with the "administrator" role
    cy.loginAs('apple@pie.org', 'Apple');
    cy.visit('admin/structure/webform/manage/resource/results/submissions');
    cy.get('#edit-search').type('cypress-ci-link-for-testing');
    cy.get('#edit-submit').click();
    cy.get("#edit-action").select("Delete submission");
    cy.get('#edit-items > thead > tr > .select-all > .form-checkbox').check();
    cy.get('#edit-apply-below').click();
    cy.get("#edit-confirm-input").check();
    cy.get("#edit-submit").click();
  });
});
