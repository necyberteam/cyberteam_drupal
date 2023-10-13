describe('Unauthenticated user tests the XDMoD Page', () => {
  it('should display XDMoD page information', () => {
    cy.visit('/xdmod');
    cy.contains('ACCESS XDMoD');
    cy.contains('ACCESS Monitoring and Measurement Services (MMS)');
    cy.contains('MMS provides the ACCESS XDMoD tool to explore,');
    cy.contains('Launch ACCESS XDMoD').click();
    cy.url().should('eq', 'https://xdmod.access-ci.org/');
    cy.visit('/xdmod');
    cy.get('img[alt="XDMoD for Researchers"]');
    cy.contains('For Researchers');
    cy.contains('View current and historical information regarding your CI usage');
    cy.contains('Learn More');
    cy.contains('For Resource Providers');
    cy.contains('Automatically find users and groups running inefficient jobs.');
    cy.get('img[alt="XDMoD for Research Providers"]');
    cy.get('img[alt="XDMoD for Ci Community"]');
    cy.contains('For the CI community');
    cy.contains('Gain insight into national CI usage. Export data for research projects.');
    cy.contains('Join Us').click();
    cy.url().should('eq', 'https://metrics.access-ci.org/get_started/#data/');
  });
});
