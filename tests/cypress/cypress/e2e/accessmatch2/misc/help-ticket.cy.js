/*
   Verify the Help Ticket page - check that clicking on the three buttons
   updates the action of the submit form button to take to the user to
   expected URLs.
*/
describe("Verify the buttons on the Help Ticket page update the form action to go to expected pages", () => {
  it("Tests the Help Ticket page", () => {

    cy.visit("/help-ticket");

    cy.contains("I need help logging into ACCESS website")
      .click();
    cy.get('#ticket-choice-form')
      .invoke('attr', 'action')
      .should('equal', 'https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/30');

    cy.contains("I need help logging into a resource")
      .click();
    cy.get('#ticket-choice-form')
      .invoke('attr', 'action')
      .should('equal', 'https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/31');

    cy.contains("I have another question")
      .click();
    cy.get('#ticket-choice-form')
      .invoke('attr', 'action')
      .should('equal', '/open-a-ticket/17')
  });
});
