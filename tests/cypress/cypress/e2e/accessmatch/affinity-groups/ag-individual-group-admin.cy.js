/**
 * Admin user tests the Individual Affinity Groups page.
 *
 * Edits the AG to add a ci-link & cider resource, and verifies those appear.
 * Verifies the see & contact members buttons appear.
 */
describe("Admin user tests the Individual Affinity Groups", () => {
  it("Should test the Individual Affinity Groups page", () => {

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

    // verify the added ci-link appears
    cy.get('.block-resources-for-affinity-group')
      .contains('CI Links');

    cy.get('#ci-links')
      .contains('cypress-ci-link-for-testing')
      .should('have.attr', 'href')
      .and('contain', '/ci-link');

    // verify the added cider resource appears
    cy.get('.node--type-access-active-resources-from-cid')
      .contains('UD DARWIN Storage (DARWIN Storage)');

    // verify email AG button has correct href
    cy.get('.block-access-affinitygroup')
      .contains('Email Affinity Group')
      .should('have.attr', 'href')
      .and('contain', '/form/affinity-group-contact?nid=327');

    // verify View Memebers button is good, and resulting page
    // has list of members
    cy.get('.view-id-affinity_group')
      .contains('View Members')
      .should('have.attr', 'href')
      .and('contain', '/affinity-groups/618/users/ACCESS Support');

    cy.get('.view-id-affinity_group')
      .contains('View Members')
      .click();

    cy.url().should('contains', '/affinity-groups/618/users/ACCESS%20Support?nid=327');

    // check the page title
    cy.get('.page-title').contains('ACCESS Support');

    // check the members table
    cy.get('.views-table').each('tr', (tr) => {

      // check each user has a link to a community-persona page
      cy.get("[headers='view-realname-table-column']")
        .find('a')
        .should('have.attr', 'href')
        .and('contain', '/community-persona');

      // check each user an @ in their email address
      cy.get("[headers='view-mail-table-column']")
        .contains('@');
    });
  });
});
