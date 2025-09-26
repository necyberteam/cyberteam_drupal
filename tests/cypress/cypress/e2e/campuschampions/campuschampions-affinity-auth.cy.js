describe("Affinity Group tests", () => {
  it("User runs through the affinity group page and individual page as authenticated", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/affinity-groups');
    cy.contains('Affinity Group');
    cy.get('#requestAffinityWide > .btn').contains('Request a Group').click();

    cy.contains('Approved').should('not.exist');

    // Assert the presence of specific text elements
    cy.contains('Affinity Group Name');
    cy.contains('Affinity Group Image');
    cy.contains('Coordinators');
    cy.contains('Tags');
    cy.contains('Description');
    cy.contains('Summary');
    cy.contains('Provide a short description that will appear on the Affinity Groups directory page.');
    cy.contains('Maximum 160 Characters Allowed');
    cy.contains('Q&A Platform');
    cy.contains('Github Organization');
    cy.contains('Email List');

    // Visit the "/affinity-groups/cloud-computing" URL
    cy.visit('/affinity-groups/cloud-computing');

    // Assert the presence of the "Join" button
    cy.get('.flag > .btn').contains('Join').click();

    // Click the "Leave" button
    cy.get('.flag > .btn').contains('Leave').click();

    // Assert the presence of the "Join" button
    cy.contains('Join');

    // Assert the presence of specific text elements
    cy.contains('Slack');
    cy.contains('Q&A');
    cy.contains('Email');
    cy.contains('Coordinators');
    cy.contains('Events');
    cy.contains('People');
  });
});
