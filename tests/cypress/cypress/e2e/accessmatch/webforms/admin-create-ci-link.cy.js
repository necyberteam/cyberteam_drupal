//
// As an admin user, create a test CI-Link called "cypress-ci-link-for-testing"
//
describe('Admin user uses form to create a CI Link', () => {
  it('should create a CI-Link', () => {

    // login user with the "administrator" role
    cy.loginAs('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/form/ci-link');
    cy.contains(' CI Link ');
    cy.task('log', 'logged in as Apple Pie, on add ci-link form');

    // cy.contains('Edit Affinity Group ACCESS Support');
    cy.get('#edit-approved').check();
    cy.get('#edit-title').type('cypress-ci-link-for-testing');
    cy.get('#edit-category').select('Learning');
    cy.get('#edit-skill-level-304').check();  // beginner level
    cy.get('#edit-skill-level-305').check();  // intermediate level
    cy.get('#edit-description').type("Dummy description for ci-link 'cypress-ci-link-for-testing'");

    // add title & url for a link
    cy.get('#edit-link-to-resource-items-0-item-title').type('title for ci-link link 0');
    cy.get('#edit-link-to-resource-items-0-item-url').type('http://example-0.com');

    // add 2 addition link options
    cy.get('#edit-link-to-resource-add-more-items').type('{selectall}{backspace}').type('2')
    cy.get('#edit-link-to-resource-add-submit').click();

    // add the 2 links
    cy.get('input[id^="edit-link-to-resource-items-1-item-title"]').type('title for ci-link link 1');
    cy.get('input[name="link_to_resource[items][1][_item_][url]"]').type('http://example-1.com');
    cy.get('input[name="link_to_resource[items][2][_item_][title]"').type('title for ci-link link 2');
    cy.get('input[name="link_to_resource[items][2][_item_][url]"]').type('http://example-2.com');

    // tag "access-acount" is selected
    cy.get('span[data-tid="733"]').click();

    // tag "finite-element-analysis" is selected
    cy.get('span[data-tid="588"]').click();

    // submit
    cy.get('#edit-submit').click();

    // cy.visit('/webform/ci-link/submissions/1/edit');

    // verify submission looks good
    cy.contains('cypress-ci-link-for-testing');
    cy.contains("Dummy description for ci-link 'cypress-ci-link-for-testing'");
    cy.contains('title for ci-link link 0').should('have.attr', 'href', 'http://example-0.com');
    cy.contains('title for ci-link link 1').should('have.attr', 'href', 'http://example-1.com');
    cy.contains('title for ci-link link 2').should('have.attr', 'href', 'http://example-2.com');
    cy.contains('access-acount').should('have.attr', 'href').and('contains', '/tags/access-acount');
    cy.contains('finite-element-analysis').should('have.attr', 'href').and('contains', '/tags/finite-element-analysis');
    cy.contains('Beginner').should('have.attr', 'href').and('contains', '/skill-level/beginner');;
    cy.contains('Intermediate').should('have.attr', 'href').and('contains', '/skill-level/intermediate');;

  });
});
