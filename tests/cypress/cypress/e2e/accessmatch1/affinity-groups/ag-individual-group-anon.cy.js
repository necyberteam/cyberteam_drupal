/**
 * Anonymous user tests the Individual Affinity Groups page.
 *
 * Checks breadcrumps, tags, join, slack, q&a, image, events, announcements,
 * coordinators & askci table.
 */
describe("Anonymous user tests the Individual Affinity Groups page", () => {
  it("Should test the Individual Affinity Groups page", () => {

    cy.visit("/affinity-groups/access-support");

    cy.get('#block-pagetitle').contains("ACCESS Support");

    // check breadcrumbs
    const crumbs = [
      ['Support', '/'],
      ['Affinity Groups', '/affinity-groups'],
      ['ACCESS Support', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    // tags
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

    // verify image
    cy.get('.field--name-field-image')
      .find('img')
      .verifyImage();

    // events & announcements
    cy.get('.block-access-affinitygroup.block-affinity-bottom-left')
      .contains('Upcoming Events');
    cy.get('.block-access-affinitygroup.block-affinity-bottom-left')
      .contains('See past events')
      .should('have.attr', 'href')
      .and('contain', '/events/past');
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

    // should have 6 rows (including header)
    cy.get('table[id="ask-ci"]').find('tr').should('have.length', 6);

    // check each row has link to ask.ci
    cy.get('table[id="ask-ci"]')
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
