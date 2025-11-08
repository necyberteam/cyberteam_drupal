/**
 * Test PA Science project email notifications
 *
 * This test verifies that the correct emails are sent when:
 * - Someone expresses interest in a recruiting project (to author and PA Science Manager)
 *
 * Note: These tests should be run with CYPRESS_BASE_URL=https://pasciencedmz.ddev.site
 *
 * Implementation details:
 * - Uses Flag module with flag_id 'interested_in_project'
 * - Email policy: access_misc_project.project_flagged
 * - Emails sent to pascience_manager role and project author
 */

describe("PA Science Project Email Notifications", () => {

  beforeEach(() => {
    // Clear mailpit before each test to ensure clean state
    cy.clearMailpit();
  });

  it("Sends emails when someone expresses interest in a recruiting project", () => {
    // First, create a recruiting project as admin
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/form/project');

    // Fill out recruiting project form
    cy.get('input[name="approved_milestones"]').check();
    cy.get('input[name="approved"]').check();
    cy.get('input[name="project_title"]').type('PA Science Recruiting Test');
    cy.get('input[name="region[933]"]').check(); // PA Science region (tid: 933)
    cy.get('input[name="tags[682]"]').check(); // Login tag (or any available tag)
    cy.get('select[name="status"]').select('Recruiting'); // Set to Recruiting status

    cy.get('input[name="project_leader[first]"]').type('Project');
    cy.get('input[name="project_leader[last]"]').type('Leader');
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('projectleader@test.com');
    cy.get('textarea[name="project_description"]').type('This is a recruiting project for PA Science');

    cy.get('input#edit-actions-01-submit').click();

    // Verify project was created with Recruiting status
    cy.url().should('include', '/project/');
    cy.contains('PA Science Recruiting Test');
    cy.contains('Recruiting');

    // Clear mailpit before someone expresses interest
    cy.clearMailpit();

    // Now login as different user and express interest
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/projects');

    // Search for the recruiting project
    cy.get('input[name="search"]').type('PA Science Recruiting Test');
    cy.wait(2000); // Wait for search results
    cy.contains('PA Science Recruiting Test').click();

    // Click "I'm interested" button (this triggers the flag event)
    cy.contains("I'm interested").click();

    // Wait for AJAX flag request to complete and button to update
    cy.contains('interested', { timeout: 10000 }).should('be.visible');

    // Give additional time for the flag event subscriber to process and send emails
    cy.wait(3000);

    // Debug: Log all emails that were sent
    cy.log('Checking all emails sent to Mailpit...');
    cy.getMailpitMessages().then((messages) => {
      cy.log(`Found ${messages ? messages.length : 0} total messages in Mailpit`);
      if (messages && messages.length > 0) {
        messages.forEach((msg, index) => {
          cy.log(`Email ${index + 1}: To: ${msg.To ? msg.To.map(t => t.Address).join(', ') : 'none'}, Subject: ${msg.Subject}`);
        });
      }
    });

    // Check for emails - subject format: "{{ title }} - interest shown on project"
    // Note: Emails go to the submission owner (administrator@amptesting.com), not the email field value

    // Check for project author notification email (submission owner)
    cy.waitForEmail({
      to: 'administrator@amptesting.com',
      subject: 'PA Science Recruiting Test - interest shown on project'
    }, 8000).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'PA Science Recruiting Test - interest shown on project',
        to: 'administrator@amptesting.com',
        htmlContains: 'is interested in the project'
      });
    });

    // Check for PA Science Manager notification email
    cy.waitForEmail({
      to: 'user+1995@localhost.localdomain',
      subject: 'PA Science Recruiting Test - interest shown on project'
    }, 8000).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'PA Science Recruiting Test - interest shown on project',
        to: 'user+1995@localhost.localdomain',
        htmlContains: 'is interested in the project'
      });
    });
  });

  it("Cleanup - Delete test projects", () => {
    // Login as admin to cleanup
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/admin/structure/webform/manage/project/results/submissions');

    // Delete test projects
    const testTitles = [
      'PA Science Recruiting Test',
      'PA Science Test Project' // From the other test file
    ];

    testTitles.forEach(title => {
      cy.get('body').then($body => {
        if ($body.text().includes(title)) {
          // Click the Delete link in the table
          cy.contains(title).closest('tr').find('a').contains('Delete').click({ force: true });
          // Click the Delete button in the jQuery UI dialog buttonpane
          cy.get('.ui-dialog-buttonpane button.button--primary').contains('Delete').click();
          cy.wait(1000); // Wait for deletion to complete
        }
      });
    });
  });
});
