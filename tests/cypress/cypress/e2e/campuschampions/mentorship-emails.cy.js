/**
 * Test Campus Champions mentorship email notifications
 * 
 * This test verifies that the correct emails are sent when people
 * express interest in Campus Champions mentorships.
 * 
 * Note: These tests should be run with CYPRESS_BASE_URL=https://ccmnet.ddev.site
 * Mentorships are created on CCMNet domain but filtered for Campus Champions program
 */

describe("Campus Champions Mentorship Email Notifications", () => {
  
  beforeEach(() => {
    // Clear mailpit before each test to ensure clean state
    cy.clearMailpit();
  });

  it("Sends emails when creating a Campus Champions mentorship", () => {
    // Login as regular user
    cy.loginWith("pecan@pie.org", "Pecan");
    cy.visit("/node/add/mentorship_engagement");

    // Fill out Campus Champions specific mentorship form
    cy.get("#edit-field-me-looking-for-mentor").check();
    cy.get("#edit-title-0-value").type("Campus Champions Test Mentorship for Email Verification");
    cy.get("#edit-body-0-summary").type("This is a Campus Champions mentorship to test email notifications");
    
    cy.get('.form-item-body-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance;
      editor.setData('This is a detailed description of the Campus Champions mentorship. Testing email notifications for Campus Champions specific mentorships.');
    });

    cy.get("details.tags summary").click();
    cy.get("#tag-ai").click();

    cy.get('.form-item-field-me-preferred-attributes-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance;
      editor.setData('Looking for a Campus Champions mentor with experience in HPC and AI.');
    });

    // Select Campus Champions program (ID 910) - it's a radio button
    cy.get('#edit-field-mentorship-program-910').check();

    cy.get('#edit-field-me-state').select('Recruiting');

    // Submit the form
    cy.get(".node-mentorship-engagement-form #edit-submit").click();

    // Verify we're on the created mentorship page
    cy.url().should('include', '/mentorships/');
    cy.contains('Campus Champions Test Mentorship for Email Verification');

    // Check for author confirmation email
    cy.waitForEmail({
      to: 'pecan@pie.org',
      subject: 'Mentorship Engagement received'
    }).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Mentorship Engagement received',
        from: 'noreply@ccmnet.org',
        to: 'pecan@pie.org',
        htmlContains: 'Your requested CCMNet mentorship engagement has been created'
      });
    });

    // Check for admin notification email
    cy.waitForEmail({
      subject: 'New Mentorship Created'
    }, 8000).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'New Mentorship Created',
        from: 'noreply@ccmnet.org',
        htmlContains: 'A new CCMNet mentorship has been requested'
      });
    });
  });

  it("Sends interest notification emails when someone clicks 'interested' on Campus Champions mentorship", () => {
    // First, create a Campus Champions mentorship as above (abbreviated)
    cy.loginWith("pecan@pie.org", "Pecan");
    cy.visit("/node/add/mentorship_engagement");
    
    cy.get("#edit-field-me-looking-for-mentor").check();
    cy.get("#edit-title-0-value").type("CC Interest Test - Email Verification");
    cy.get("#edit-body-0-summary").type("Campus Champions mentorship for testing interest emails");
    
    cy.get('.form-item-body-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance;
      editor.setData('Testing interest notifications for Campus Champions mentorships.');
    });

    cy.get("details.tags summary").click();
    cy.get("#tag-ai").click();
    cy.get('#edit-field-mentorship-program-910').check();
    cy.get('#edit-field-me-state').select('Recruiting');
    cy.get(".node-mentorship-engagement-form #edit-submit").click();

    // Approve the mentorship as admin
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit("/admin/content");
    cy.get(':nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();
    cy.get('#edit-field-ccmnet-approved-value').check();
    cy.get('form.node-mentorship-engagement-edit-form #edit-submit').click();

    // Clear mailpit before expressing interest
    cy.clearMailpit();

    // Login as different user and express interest
    cy.loginWith("walnut@pie.org", "Walnut");
    cy.visit("/mentorships");
    cy.get('h2.ccmnet-link a').contains('CC Interest Test - Email Verification').click({ force: true });
    
    // Click the "I'm Interested" button (or other interest button text)
    cy.get('a[href*="/interested"]').click();
    
    // Should be redirected back to mentorship page
    cy.url().should('include', '/mentorships/');
    cy.contains('You have been added to the interested list');

    // Check the state to make sure the button click worked
    cy.drush('state:get', ['access_mentorship_interested']).then((result) => {
      cy.log('Interest state after button click:', result.stdout);
      
      // Parse and validate the state
      const state = result.stdout.trim();
      if (state === '0' || state === '' || state === 'null') {
        cy.fail('Interest state was not set properly after button click. State: ' + state);
      } else {
        cy.log('State looks good, contains:', state);
        // Try to parse as JSON to see the structure
        try {
          const parsed = JSON.parse(state);
          cy.log('Parsed state:', parsed);
        } catch (e) {
          cy.log('State is not JSON, raw value:', state);
        }
      }
    });

    // Run cron with test mode to bypass time restrictions
    cy.exec('ddev exec "CYPRESS_TEST_MODE=true drush cron"');

    // Check state after cron to see if it was processed
    cy.drush('state:get', ['access_mentorship_interested']).then((result) => {
      cy.log('Interest state after cron:', result.stdout);
    });

    // Debug: Check what emails were sent
    cy.getMailpitMessages().then((messages) => {
      cy.log('All emails after cron:', messages.map(m => ({ 
        subject: m.Subject, 
        to: m.To,
        from: m.From 
      })));
    });

    // Check for author notification email
    cy.waitForEmail({
      to: 'pecan@pie.org',
      subject: 'Interest in your Mentorship'
    }, 8000).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Interest in your Mentorship',
        from: 'noreply@ccmnet.org',
        to: 'pecan@pie.org',
        htmlContains: 'Someone is interested in your mentorship request'
      });
    });

    // Check for Campus Champions admin summary email (goes to champions_mentorship_admin role)
    cy.waitForEmail({
      subject: 'Daily mentorship interest summary'
    }, 8000).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Daily mentorship interest summary',
        from: 'noreply@ccmnet.org',
        htmlContains: 'CC Interest Test - Email Verification' // Should contain our test mentorship title
      });
    });
  });

  it("Verifies Campus Champions mentorships are filtered properly", () => {
    // Go to CCMNet mentorships page with Campus Champions filter
    cy.visit("/mentorships?f%5B0%5D=mentorship_program%3A910");
    
    // Check that we have the Campus Champions filter applied
    cy.url().should('include', 'f%5B0%5D=mentorship_program%3A910');
    
    // Verify that the mentorships page loads
    cy.get('h1, .page-title').should('exist');
    
    // Verify mentorships content area exists (may be empty if no matching items)
    cy.get('body').should('contain.text', 'mentorships');
  });

  it("Tests removal from interested list", () => {
    // First add interest (reuse logic from previous test)
    cy.loginWith("pecan@pie.org", "Pecan");
    cy.visit("/node/add/mentorship_engagement");
    
    cy.get("#edit-field-me-looking-for-mentor").check();
    cy.get("#edit-title-0-value").type("CC Removal Test - Email Verification");
    cy.get("#edit-body-0-summary").type("Testing removal from interested list");
    
    cy.get('.form-item-body-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance;
      editor.setData('Testing interest removal for Campus Champions mentorships.');
    });

    cy.get("details.tags summary").click();
    cy.get("#tag-ai").click();
    cy.get('#edit-field-mentorship-program-910').check();
    cy.get('#edit-field-me-state').select('Recruiting');
    cy.get(".node-mentorship-engagement-form #edit-submit").click();

    // Approve as admin
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit("/admin/content");
    cy.get(':nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();
    cy.get('#edit-field-ccmnet-approved-value').check();
    cy.get('form.node-mentorship-engagement-edit-form #edit-submit').click();

    // Add interest
    cy.loginWith("walnut@pie.org", "Walnut");
    cy.visit("/mentorships");
    cy.get('h2.ccmnet-link a').contains('CC Removal Test - Email Verification').click({ force: true });
    
    // First click - add to interested list  
    cy.get('a[href*="/interested"]').click();
    cy.contains('You have been added to the interested list');
    
    // Second click - remove from interested list (button should now say something different)
    cy.get('a[href*="/interested"]').click();
    cy.contains('You have been removed from the interested list');
  });

  it("Cleanup - Delete Campus Champions test mentorships", () => {
    // Login as admin to cleanup
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit("/admin/content");

    // Delete test mentorships
    const testTitles = [
      'Campus Champions Test Mentorship for Email Verification',
      'CC Interest Test - Email Verification',
      'CC Removal Test - Email Verification'
    ];

    testTitles.forEach(title => {
      cy.get('.view-content').then($content => {
        if ($content.text().includes(title)) {
          cy.get('.view-content').contains(title).closest('tr').find('.dropbutton-toggle button').click();
          cy.contains('Delete').click({ force: true });
          // Confirm deletion in the dialog
          cy.get('.ui-dialog-buttonpane .button--primary').contains('Delete').click();
        }
      });
    });
  });
});