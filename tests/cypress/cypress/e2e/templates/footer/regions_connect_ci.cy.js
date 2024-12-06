describe("Test Connect.Ci Page", () => {

  it("User is on the Connect.CI Page", () => {
    cy.visit('/regions');
    cy.contains('Connect.CI');
    cy.contains('Card View');
    cy.contains('List View');
    cy.contains('Programs');
    cy.contains('Affinity Groups');
    cy.contains('List View').click();
    cy.url().should('include', 'connectci_list');
    cy.contains('Card View').click();
    cy.url().should('include', '/regions');
    cy.get('a[href="https://careers-ct.cyberinfrastructure.org/"]').contains('CAREERS Cyberteam').click();
    // does not work: cy.url().should('eq', 'https://careers-ct.cyberinfrastructure.org/');
    cy.visit('/regions');
    cy.contains('Ask.CI Moderators').click();
    cy.url().should('include', '/affinity-groups/askci-moderators');
  });

  it("User is on the Connect.CI Page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/regions');
    cy.contains('Connect.CI');
    cy.contains('Card View');
    cy.contains('List View');
    cy.contains('Programs');
    cy.contains('Affinity Groups');
    cy.contains('List View').click();
    cy.url().should('include', 'connectci_list');
    cy.contains('Card View').click();
    cy.url().should('include', '/regions');
    cy.get('a[href="https://careers-ct.cyberinfrastructure.org/"]').contains('CAREERS Cyberteam').click();
    // does not work cy.url().should('eq', 'https://careers-ct.cyberinfrastructure.org/');
    cy.visit('/regions');
    cy.contains('Ask.CI Moderators').click();
    cy.url().should('include', '/affinity-groups/askci-moderators');
  });

});
