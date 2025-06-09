/*
* Verify the contact form can be used to send an email.
*
*/
describe('user199 visits user201s community-persona page to send email', () => {
  it('should find expected stuff', () => {
    cy.loginAs('walnut@pie.org', 'Walnut');
    cy.visit('/community-persona/201');
    cy.get('#block-communitypersonablock-4 > .persona')
      .contains('Send Email').click();
    cy.url().should('include', '/user/201/contact');

    cy.get('#edit-name').contains("Your name");
    cy.get('#edit-name').contains("Walnut Pie");
    cy.get('#edit-mail').contains("Your email address");
    cy.get('#edit-mail').contains("walnut@pie.org");
    cy.get('#edit-recipient').contains("Pecan Pie");
    cy.get('#edit-subject-0-value').type('Test Subject', { delay: 0 });
    cy.get('#edit-message-0-value').type('Test Message', { delay: 0 });
    cy.get('#edit-copy').check();
    cy.get('#edit-submit').click();
    cy.contains('Your message has been sent.');
  });
});
