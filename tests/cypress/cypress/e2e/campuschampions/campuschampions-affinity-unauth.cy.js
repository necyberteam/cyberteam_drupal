describe("Affinity Groups tests anon", () => {
  it("Visitor runs through the affinity group page", () => {
    cy.visit('/affinity-groups');
    cy.contains('Affinity Groups');
    cy.contains('Request a Group');
  });

  it("Visitor runs through access-support page", () => {
    cy.visit('/affinity-groups/access-support');
    cy.contains('Members get updates');
    cy.contains('ACCESS Support');
    cy.contains('ACCESS-website');
    cy.contains('Become an ACCESS Support insider by joining our affinity group.');
    cy.contains('Join');
    cy.contains('Slack');
    cy.contains('Events');
    cy.contains('Knowledge Base Resources');
    cy.contains('Announcements');
    cy.contains('People')
  });

});
