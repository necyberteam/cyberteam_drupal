describe("For an authenticated or admin user, test forms.", () => {
  it("Authenticated user fills out the enter ticket form", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/form/issue');
    cy.contains('Issue');
    cy.contains('Ticket Data');
    cy.contains('Title');
    cy.contains('Region');
    cy.contains('Category');
    cy.contains('Priority');
    cy.contains('Tags');
    cy.contains('Select one (or more) tags that apply.');
    cy.contains('Issue Summary');
    cy.contains('Details');
    cy.contains('Files');
    cy.get('input[name="title"]').type('TEST');
    cy.get('select[name="region"]').select('At-Large');
    cy.get('select[name="category"]').select('Bug report');
    cy.get('select[name="priority"]').select('Critical');
    cy.get('input#edit-tags3-682').check();
    cy.get('textarea[name="details"]').type('TEST');
    cy.get('#webform-submission-issue-add-form > #edit-actions > #edit-submit').click();
    cy.contains("Thank you! Your ticket has been submitted! We'll be in touch soon.");
  });

  it("Administrator user fills out the enter ticket form", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/form/issue');
    cy.contains('Issue');
    cy.contains('Ticket Data');
    cy.contains('Title');
    cy.contains('Region');
    cy.contains('Category');
    cy.contains('Priority');
    //cy.contains('Status');
    cy.contains('Tags');
    cy.contains('Select one (or more) tags that apply.');
    cy.contains('Issue Summary');
    cy.contains('Details');
    cy.contains('Files');
    cy.get('input[name="title"]').type('TEST');
    cy.get('select[name="region"]').select('At-Large');
    cy.get('select[name="category"]').select('Bug report');
    cy.get('select[name="priority"]').select('Critical');
    cy.get('input#edit-tags3-682').check();
    cy.get('select[data-drupal-selector="edit-status-select"]').select('Active');
    cy.get('textarea[name="details"]').type('TEST');
    cy.get('#webform-submission-issue-add-form > #edit-actions > #edit-submit').click();
    cy.contains("Thank you! Your ticket has been submitted! We'll be in touch soon.");
  });

});
