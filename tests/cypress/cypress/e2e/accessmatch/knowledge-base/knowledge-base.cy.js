/*
    Test /knowledge-base
 */
describe("Tests of the knowledge-base page", () => {
  it("Should complete successfully", () => {

    cy.visit("/knowledge-base");

    cy.get('#block-pagetitle').contains("Knowledge Base");

    // check breadcrumbs
    const crumbs = [
      ['Support', '/'],
      ['Knowledge Base', '/knowledge-base'],
      ['Overview', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    cy.get('.btn.btn-primary.ms-0')
      .contains('Search')
      .should('have.attr', 'href', '/find');
    cy.contains('Create an account')
      .should('have.attr', 'href', 'https://operations.access-ci.org/identity/new-user');
    cy.contains('Video learning center')
      .should('have.attr', 'href', '/video-learning-center');
    cy.contains('ACCESS Resource Advisor')
      .should('have.attr', 'href', 'https://access-ara.ccs.uky.edu:8080');
    cy.get('.btn.btn-primary.ms-0')
      .contains('Open a ticket')
      .should('have.attr', 'href', '/help-ticket');
    cy.contains('GET STARTED WITH ACCESS')
      .should('have.attr', 'href', 'https://access-ci.org/about/get-started/');
    cy.contains('VIDEO LEARNING CENTER')
      .should('have.attr', 'href', 'https://support.access-ci.org/video-learning-center');
    cy.contains('ACCESS RESOURCE ADVISOR')
      .should('have.attr', 'href', 'https://access-ara.ccs.uky.edu:8080');
    cy.get('.btn.btn-primary.mt-8')
      .contains('Visit documentation')
      .should('have.attr', 'href'); // TODO , 'https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/overview');
    cy.get('.btn.btn-primary')
      .contains('VISIT ASK.CI')
      .should('have.attr', 'href', 'https://ask.cyberinfrastructure.org');

    // popular tags
    cy.get('.block-top-tags-from-askci')
      .contains('Popular tags on Ask.CI');

    cy.get('.block-top-tags-from-askci')
      .find('a')
      .each(($a) => cy.wrap($a)
        .should('have.attr', 'href')
        .and('contain', 'https://ask.cyberinfrastructure.org/tag'));

    // popular ci-links
    create_dummy_ci_link();

    cy.get('.btn.btn-primary')
      .contains('FIND LINKS')
      .should('have.attr', 'href', '/knowledge-base/ci-links');

    cy.get('.field--type-text-with-summary')
      .contains('Popular CI Links');

    // verify count of ask-ci links is 10
    cy.get('.block-top-tags-from-askci > .flex-wrap')
      .find('a').should('have.length', 10);

    // test the known ci-link
    cy.get('.view-resources.view-id-resources')
      .contains('dummy-ci-link-for-testing-knowledge-base')
      .should('have.attr', 'href')
      .and('contain', '/ci-links');

    /*
    <div class="my-3 view view-resources view-id-resources view-display-id-block_4 js-view-dom-id-8d851d82ae2783e99f65b39f6a4d7701d0e420172a1866fbffdf7f56c4eb8f17">



          <div class="view-content">
          <div class="list-none">

      <ul class="mt-0">

              <li class="m-0"><div class="views-field views-field-webform-submission-value-5"><span class="field-content"><a href="/ci-links/4">access-support-ci-link-for-testing</a></span></div></li>
              <li class="m-0"><div class="views-field views-field-webform-submission-value-5"><span class="field-content"><a href="/ci-links/7">cypress-ci-link-for-testing</a></span></div></li>
              <li class="m-0"><div class="views-field views-field-webform-submission-value-5"><span class="field-content"><a href="/ci-links/2">dummy-ci-link-for-testing-knowledge-base</a></span></div></li>

      </ul>

    </div>

        </div>

              </div>
    */
    // verify count of ci-links is 3
    cy.get('.view-resources.view-id-resources')
      .find('a').should('have.length', 3);

    // test any other ci-links
    cy.get('.view-resources.view-id-resources')
      .find('a')
      .each(($a) => cy.wrap($a)
        .should('have.attr', 'href')
        .and('contain', '/ci-links'));

  });
});


// helper function to create a ci-link that can be added to the AG
function create_dummy_ci_link() {
  cy.loginAs('administrator@amptesting.com', 'b8QW]X9h7#5n');
  cy.visit('/form/ci-link');
  cy.get('#edit-approved').check();
  cy.get('#edit-title').type('dummy-ci-link-for-testing-knowledge-base');
  cy.get('#edit-category').select('Learning');
  cy.get('#edit-skill-level-304').check();  // beginner level
  cy.get('#edit-description').type("Dummy description for ci-link 'dummy-ci-link-for-testing-knowledge-base'");
  // tag "access-acount" is selected
  cy.get('.tags').contains('access-acount').click();
  cy.get('#edit-submit').click();
  cy.drupalLogout();
  cy.visit("/knowledge-base");
}



