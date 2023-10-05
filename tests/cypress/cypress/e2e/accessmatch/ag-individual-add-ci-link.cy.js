describe('Admin user adds a CI Link to the AG ACCESS Support', () => {
  it('should add a CI-Link to an AG', () => {

    // Cypress.on('uncaught:exception', (err, runnable) => {

    //   // can't log from within a promise
    //   // cy.log('exception err="' + err + '");

    //   // returning false here prevents Cypress from
    //   // failing the test
    //   alert(err);
    //   return false
    // })

    // cy.login('user with the "administrator" role');
    cy.loginAs('apple@pie.org', 'Apple');
    cy.visit('/node/327/edit');
    cy.task('log', 'logged in as Walnut Pie, adding ci-link to AG "ACCESS Support"');
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
    cy.task('log', 'verified ci-link is added AG "ACCESS Support"');
  });
});
