/*
describe('Loads routes and tests', () => {
  it('Test pages as admin', () => {
    cy.fixture("login-data.json").then((loginData) => {
      loginData.users.forEach((user) => {
        if (user.username === 'user1') {
          cy.loginAs(user.username, user.password);
          cy.visit('/node/add/service_alert');
          cy.get('#edit-field-service-alert-title-0-value').type('Words about broken things');
          cy.get('#edit-field-service-alert-status').select('Service Issue Updated');
          cy.get('#edit-field-service-dashboard-category').select('13');
          cy.get('#edit-field-service-alert-iss-start1-0-value-date').type('2030-08-01');
          cy.get('#edit-field-service-alert-iss-start1-0-value-time').type('04:00:00');
          cy.contains('End Date & Time');
          cy.get('#edit-body-0-format--2').select('plain_text');
          cy.get('#edit-body-0-value').type('Random Words');
          cy.contains('File attachments');
          cy.get('#edit-body-0-format--2').select('rich_text');
          cy.get('.ui-dialog-buttonset > .button--primary').click();
          // Hit save
          cy.get('#edit-submit--2--gin-edit-form').click();
          cy.contains('Service Issue Updated: Words about broken things');
          cy.visit('/service-alerts');
          cy.contains('Service Issue Updated: Words about broken things');
          cy.deleteLastNode();
        }
      })
    })
  });
});
*

