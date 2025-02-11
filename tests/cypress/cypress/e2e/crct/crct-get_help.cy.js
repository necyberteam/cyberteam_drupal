/*
    This test is specifically focused on the CCI Homepage tested for an unauthenticated user.
*/
describe("In order to test the Get Help page", () => {
  it("Unauthenticated user Test the Get Help Page", () => {
    cy.visit('/get-research-computing-help');
    cy.contains('Get Research Computing Help');
    cy.contains('Join the Regional Slack Discussion');
    cy.contains('Ask a Question of the Community');
    cy.contains('Find Learning Resources');
    cy.contains('Join the Regional Slack Discussion');
    cy.contains('Ask a Question of the Community');
    cy.contains('Find Learning Resources').click();
    cy.contains('Knowledge Base Resources');
  });

});
