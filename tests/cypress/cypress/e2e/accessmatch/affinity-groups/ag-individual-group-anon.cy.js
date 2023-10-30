/**
 * Anonymous user tests the Individual Affinity Groups page.
 *
 * Checks breadcrumps, tags, join, slack, q&a, image, events, announcements,
 * coordinators & askci table.
 */
describe("Anonymous user tests the Individual Affinity Groups page", () => {
  it("Should test the Individual Affinity Groups for anon user", () => {

    cy.visit("/affinity-groups/access-support");

    cy.get('#block-pagetitle').contains("ACCESS Support");

    // check breadcrumbs
    cy.get('.breadcrumb')
      .contains('Support')
      .should('have.attr', 'href', '/');
    cy.get('.breadcrumb')
      .contains('Affinity Groups')
      .should('have.attr', 'href')
      .and('contain', '/affinity_groups');
    cy.get('.breadcrumb')
      .contains('ACCESS Support')
      .should('not.have.attr', 'href');

    // // tags
    cy.get('.field--name-field-tags')
      .contains('ACCESS-website')
      .should('have.attr', 'href', '/tags/access-website');
    cy.get('.field--name-field-tags')
      .contains('tickets')
      .should('have.attr', 'href', '/tags/tickets');
    cy.get('.field--name-field-tags')
      .contains('community-outreach')
      .should('have.attr', 'href', '/tags/community-outreach');

    // join, slack, q&q
    cy.get('.affinity-group-buttons')
      .contains('Join')
      .should('have.attr', 'href', '/user')
      .should('have.class', 'disabled');
    cy.get('.affinity-group-buttons')
      .contains('Slack')
      .should('have.attr', 'href')
      .and('contain', 'https://join.slack.com/t/accesscommunityslack/shared_invite/');
    cy.get('.affinity-group-buttons')
      .contains('Q&A')
      .should('have.attr', 'href')
      .and('contain', 'https://ask.cyberinfrastructure.org/c/access-forums/access-support/73');

    // // verify image
    cy.get('.field--name-field-image')
      .get('img')
      .ampVerifyImage();

    // events & announcements
    cy.get('.block-access-affinitygroup.block-affinity-bottom-left')
      .contains('Upcoming Events');
    cy.get('.block-access-affinitygroup.block-affinity-bottom-left')
      .contains('See past events')
      .should('have.attr', 'href')
      .and('contain', '/past-events');
    cy.get('.block-access-affinitygroup.block-affinity-bottom-left')
      .contains('Announcements');

    // // coordinators
    cy.get('.field--name-body.field--type-text-with-summary').contains('Coordinators');

    // check that each coordinator has a community persona link
    cy.get('.block-field-blocknodeaffinity-groupfield-coordinator')
      .find('a')
      .each(($a) => cy.wrap($a)
        .should('have.attr', 'href')
        .and('contain', '/community-persona'));

    // Look for Ask.CI table
    cy.get('.block-access-affinitygroup.block-ci-community')
      .contains('Ask.CI Recent Topics');

    // check each table has link to ask.ci
    cy.get('.block-access-affinitygroup.block-ci-community')
      .find('tr')
      .find('a')
      .each(($a) => cy.wrap($a)
        .should('have.attr', 'href')
        .and('contain', 'https://ask.cyberinfrastructure.org'));

    // and button to Ask.CI
    cy.get('.block-access-affinitygroup.block-ci-community')
      .contains('View on Ask.CI')
      .should('have.attr', 'href')
      .and('contain', 'https://ask.cyberinfrastructure.org/c/access-forums/access-support/');


  });
});
