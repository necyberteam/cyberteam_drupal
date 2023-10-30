/**
 * Admin user tests the Individual Affinity Groups page.
 *
 * Edits the AG to add a ci-link & cider resource, and verifies those appear.
 * Verifies the see & contact members buttons appear.
 */
describe("Unauthenticated user tests the Individual Affinity Groups", () => {
  it("Should test the Individual Affinity Groups for anon user", () => {

    cy.loginAs('administrator@amptesting.com', 'b8QW]X9h7#5n');

    cy.visit("/affinity-groups/access-support");

    cy.get('.page-title').contains('ACCESS Support');

    cy.get('.tabs')
      .contains("Edit")
      .should('have.attr', 'href', '/node/327/edit')
      .click();

    // edit the AG to add a ci-link & cider resource
    cy.get('#edit-field-resources-entity-reference-0-target-id').clear();
    cy.get('#edit-field-resources-entity-reference-0-target-id').type('cypress-ci-link-for-testing (2)');
    cy.get('#edit-field-cider-resources-0-target-id').clear();
    cy.get('#edit-field-cider-resources-0-target-id').type('UD DARWIN Storage (DARWIN Storage) (366)');

    // submit changes
    cy.get('#edit-submit').click()

    // verify changes appear on the AG page
    cy.get('.block-resources-for-affinity-group')
      .contains('CI Links');

    cy.get('#ci-links')
      .contains('cypress-ci-link-for-testing')
      .should('have.attr', 'href')
      .and('contain', '/ci-link');;

    cy.get('.block-access-affinitygroup')
      .contains('Email Affinity Group')
      .should('have.attr', 'href')
      .and('contain', '/form/affinity-group-contact?nid=327');

    cy.get('.view-id-affinity_group')
      .contains('View Members')
      .should('have.attr', 'href')
      .and('contain', '/affinity-groups/618/users/ACCESS Support');
  });
});
