//
// Anonymous user tests the Organization Request form
//
describe('Test the Organization Request form', () => {
  beforeEach(() => {
    cy.clearMailpit();
  });

  it('allows unauthenticated user to submit the form', () => {
    cy.visit('/form/organization-request');
    cy.get('#edit-your-name').type('Test');
    cy.get('#edit-your-email').type('test@email.com');
    cy.get('#edit-your-organization').type('Test Organization');
    cy.get('#edit-address-line-1').type('123 Main St');
    cy.get('#edit-city').type('Springfield');
    cy.get('#edit-state-province-region').type('IL');
    cy.get('#edit-zip-postal-code').type('62701');
    cy.get('#edit-country').type('United States');
    cy.get('#edit-organization-webpage').type('https://example.org');
    cy.get('#edit-submit').click();
    cy.contains('Thanks for submitting your request');
  });

  // Regression: JSM assigns the Reporter from the From header on inbound
  // email. If access_misc's mailer_build hook overrides From with the
  // Mailgun noreply address, admins can't reply to the requestor.
  it('sends the ticket email with the submitter as the From address', () => {
    const submitterEmail = `cypress-org-request-${Date.now()}@example.com`;

    cy.visit('/form/organization-request');
    cy.get('#edit-your-name').type('Cypress Tester');
    cy.get('#edit-your-email').type(submitterEmail);
    cy.get('#edit-your-organization').type('Cypress Test Organization');
    cy.get('#edit-address-line-1').type('123 Main St');
    cy.get('#edit-city').type('Springfield');
    cy.get('#edit-state-province-region').type('IL');
    cy.get('#edit-zip-postal-code').type('62701');
    cy.get('#edit-country').type('United States');
    cy.get('#edit-organization-webpage').type('https://example.org');
    cy.get('#edit-submit').click();
    cy.contains('Thanks for submitting your request');

    cy.waitForEmail({
      to: 'support@access-ci.atlassian.net',
      subject: 'Request to add an organization from Cypress Tester',
    }).then((message) => {
      cy.assertEmailContent(message, {
        from: submitterEmail,
        to: 'support@access-ci.atlassian.net',
        subject: 'Request to add an organization from Cypress Tester',
      });
    });
  });
});
