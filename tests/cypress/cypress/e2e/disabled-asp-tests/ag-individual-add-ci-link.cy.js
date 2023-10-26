/**
 * Verifies that an admin user can add a CI Link to an affinity group
 *
 * CURENTLY BROKEN because the test ci-link "ci-link-for-user-200" is
 * not being created in amp_dev.install.
 *
 */
//
//
describe('Admin user adds a CI Link to the AG ACCESS Support', () => {
  it('should add a CI-Link to an AG', () => {
    cy.loginAs('apple@pie.org', 'Apple');
    cy.visit('/node/327/edit');
    cy.task('log', 'logged in as Apple Pie, adding ci-link to AG "ACCESS Support"');
    cy.contains('Edit Affinity Group ACCESS Support');
    cy.get('#edit-field-resources-entity-reference-0-target-id').type('ci-link-for-user-200');
    cy.contains('Save').click();
    cy.contains('Affinity Group ACCESS Support has been updated.');
    cy.contains('ci-link-for-user-200').click();
    cy.contains('ci-link-for-user-200');
    cy.task('log', 'verified ci-link is added AG "ACCESS Support"');
  });
});
