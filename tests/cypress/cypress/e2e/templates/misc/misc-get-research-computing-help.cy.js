describe("This Behat test goes over the Get Help Page", () => {
  it("Unauthenticated user Test the Get Help Page", () => {
    cy.visit('/get-research-computing-help');
    cy.contains('Get Research Computing Help');
    cy.contains('at the Regional Help Desk');
    cy.contains('Ask a Question of the Community');
    cy.contains('Find Learning Resources');
    cy.contains('at the Regional Help Desk').click();
    cy.contains('You must log in to view this page');
    cy.visit('/get-research-computing-help');
    cy.contains('Join the Regional Slack Discussion').click();
    cy.contains('Ask a Question of the Community').click();
    cy.contains('Find Learning Resources').click();
    cy.contains('Knowledge Base Resources');
  });

  it("Authenticated user Test the Get Help Page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/get-research-computing-help');
    cy.contains('Get Research Computing Help');
    cy.contains('Ask a Question of the Community');
    cy.contains('Find Learning Resources');
    cy.contains('Join the Regional Slack Discussion').click();
    cy.contains('Ask a Question of the Community').click();
    cy.contains('Find Learning Resources').click();
    cy.contains('Knowledge Base Resources');
  });

});
