describe('Admin user adds a CI Link to the AG ACCESS Support', () => {
  it('should add a CI-Link to an AG', () => {

    // cy.login('user with the "administrator" role');
    cy.loginAs('jasper.amp@gmail.com', 'jasper');
    cy.visit('/node/327/edit');
    cy.log('on node');
    cy.contains('Edit Affinity Group ACCESS Support');

    cy.get('#edit-field-resources-entity-reference-0-target-id').type('ci-link-for-user-200');

    // cy.get('input [data-drupal-selector="edit-field-resources-entity-reference-0-target-id"]').type('ci-link-for-user-200');
    // cy.screenshot();
    cy.contains('Save').click();
    // cy.wait(2000);
    cy.contains('Affinity Group ACCESS Support has been updated.');
    cy.contains('ci-link-for-user-200').click();
    // cy.wait(1000);
    cy.contains('ci-link-for-user-200');
  });
});
