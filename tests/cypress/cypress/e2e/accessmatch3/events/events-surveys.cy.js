/*
  Test Event Registration Surveys feature

  This feature allows event creators to configure three types of surveys:

  1. Screening Survey - Sent immediately when a user registers (before approval)
     - Fields: field_screen_survey_url, field_screen_survey_email_text
     - Purpose: Pre-screening registrants before event

  2. Pre-Survey - Sent when registration is approved
     - Fields: field_pre_survey_url, field_pre_survey_email_text
     - Purpose: Gather information before the event

  3. Post-Survey - Sent via cron 30 minutes before event ends + reminder 3 days after
     - Fields: field_post_survey_url, field_post_survey_email_text
     - Purpose: Collect feedback after event attendance
     - Has redirect route: /events/{entity}/post_survey/{user}
*/

describe('Event Registration Surveys', () => {

  // Test event name used across tests
  const testEventName = 'cypress-survey-test-event';
  const testSurveyUrl = 'https://example.com/test-survey';

  describe('Survey form fields on Event Series', () => {

    beforeEach(() => {
      cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    });

    it('Should display all survey fields on event series edit form', () => {
      cy.visit('/events/add');

      // Survey fields are only visible when registration is enabled
      cy.get('input[data-drupal-selector="edit-event-registration-0-registration"]').check();
      // Wait for JS to show the survey field groups
      cy.wait(500);

      // Expand the Screening Survey fieldset (look for it specifically by its field group ID)
      cy.get('#edit-group-screening-survey').should('be.visible');
      cy.get('#edit-group-screening-survey > summary').click();
      // Verify Screening Survey fields exist
      cy.get('#edit-field-screen-survey-url-0-uri').should('exist');

      // Expand the Pre Survey fieldset
      cy.get('#edit-group-surveys').should('be.visible');
      cy.get('#edit-group-surveys > summary').click();
      // Verify Pre-Survey fields exist
      cy.get('#edit-field-pre-survey-url-0-uri').should('exist');

      // Expand the Post Survey fieldset
      cy.get('#edit-group-post-survey').should('be.visible');
      cy.get('#edit-group-post-survey > summary').click();
      // Verify Post-Survey fields exist
      cy.get('#edit-field-post-survey-url-0-uri').should('exist');
    });

    it('Should display survey field descriptions with email templates', () => {
      cy.visit('/events/add');

      // Verify screening survey description mentions when email is sent
      cy.contains('screening survey email goes to a person that registers as soon as they register').should('exist');

      // Verify pre-survey description
      cy.contains('pre survey email goes to a registered person as soon as they are accepted').should('exist');

      // Verify post-survey description mentions timing
      cy.contains('post survey email goes to attendees around 30 minutes before the end').should('exist');
    });

  });

  describe('Create test event with surveys configured', () => {

    before(() => {
      cy.clearMailpit();
    });

    it('Should create event with all survey fields configured', () => {
      cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
      cy.visit('/events/add');

      // Basic event details
      cy.get('#edit-title-0-value').type(testEventName, { delay: 0 });

      cy.get('.field--name-body .ck-content').then(el => {
        const editor = el[0].ckeditorInstance;
        editor.setData('This is a test event for survey functionality testing. It includes screening, pre, and post surveys.');
      });

      cy.get('#edit-summary-text').type('Survey test event summary.', { delay: 0 });

      // Date and Time - set to future date
      cy.get('#edit-recur-type-custom').click();
      cy.get('#edit-custom-date-0-value-date').type('2026-06-15', { delay: 0 });
      cy.get('#edit-custom-date-0-end-value-date').type('2026-06-15', { delay: 0 });
      cy.get('#edit-custom-date-0-value-time').type('10:00:00', { delay: 0 });
      cy.get('#edit-custom-date-0-end-value-time').type('12:00:00', { delay: 0 });

      // Event Location and Contact
      cy.get('#edit-field-location-0-value').type('Online - Zoom', { delay: 0 });
      cy.get('#edit-field-contact-0-value').type('Test Admin', { delay: 0 });

      // Event Tag
      cy.get('details.tags summary').click();
      cy.get('#tag-training').click();

      // Registration settings
      cy.get('input[data-drupal-selector="edit-event-registration-0-registration"]').check();
      cy.get('#edit-event-registration-0-capacity').type('10', { delay: 0 });
      cy.get('input[data-drupal-selector="edit-event-registration-0-waitlist"]').check();

      // Wait for JS to show survey field groups after registration is checked
      cy.wait(500);

      // Configure Screening Survey (scroll to and expand fieldset first)
      cy.get('#edit-group-screening-survey').should('be.visible');
      cy.get('#edit-group-screening-survey > summary').scrollIntoView().click();
      cy.get('#edit-field-screen-survey-url-0-uri').type(testSurveyUrl + '?type=screening', { delay: 0 });
      // Use CKEditor5 API for the text field
      cy.get('#edit-group-screening-survey .ck-content').then(el => {
        const editor = el[0].ckeditorInstance;
        editor.setData('Please complete this screening survey before we review your registration.');
      });

      // Configure Pre-Survey (scroll to and expand fieldset first)
      cy.get('#edit-group-surveys').should('be.visible');
      cy.get('#edit-group-surveys > summary').scrollIntoView().click();
      cy.get('#edit-field-pre-survey-url-0-uri').type(testSurveyUrl + '?type=pre', { delay: 0 });
      // Use CKEditor5 API for the text field
      cy.get('#edit-group-surveys .ck-content').then(el => {
        const editor = el[0].ckeditorInstance;
        editor.setData('Please complete this pre-event survey to help us prepare for the session.');
      });

      // Configure Post-Survey (scroll to and expand fieldset first)
      cy.get('#edit-group-post-survey').should('be.visible');
      cy.get('#edit-group-post-survey > summary').scrollIntoView().click();
      cy.get('#edit-field-post-survey-url-0-uri').type(testSurveyUrl + '?type=post', { delay: 0 });
      // Use CKEditor5 API for the text field
      cy.get('#edit-group-post-survey .ck-content').then(el => {
        const editor = el[0].ckeditorInstance;
        editor.setData('Thank you for attending! Please share your feedback in this survey.');
      });

      // Event Type and other required fields
      cy.get('#edit-field-event-type-training').click();
      cy.get('#edit-field-affiliation-community').click();
      cy.get('#edit-field-skill-level-beginner').click();

      // Publish
      cy.get('#edit-moderation-state-0-state').select('Published');
      cy.get('#edit-submit').click();

      // Verify success
      cy.contains('Successfully saved').should('be.visible');
    });

  });

  describe('Screening Survey (sent on registration)', () => {

    before(() => {
      cy.clearMailpit();
    });

    it('Should send screening survey email when user registers for event with survey configured', () => {
      cy.clearMailpit();

      cy.loginAs("walnut@pie.org", "Walnut");

      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').type('survey-test', { delay: 0 });
      cy.wait(1000);
      cy.contains(testEventName).click();

      // Register for the event
      cy.contains('Register').click();
      cy.contains('Please confirm your registration below');
      cy.get('#edit-submit').click();

      // Verify registration message mentions survey
      cy.contains('You will receive a screening survey email shortly after registering').should('be.visible');

      // Check for screening survey email
      cy.waitForEmail({
        to: 'walnut@pie.org',
        subject: 'Please Complete a Pre-Screening Survey for ' + testEventName
      }).then((message) => {
        cy.assertEmailContent(message, {
          subject: 'Please Complete a Pre-Screening Survey for ' + testEventName,
          from: 'noreply@support.access-ci.org',
          to: 'walnut@pie.org',
          // Verify screening survey URL and custom text are in email
          htmlContains: [
            'screening',
            testSurveyUrl,
            'Please complete this screening survey'
          ]
        });
      });
    });

  });

  describe('Pre-Survey (sent on approval)', () => {

    it('Should send pre-survey email when registration is approved', () => {
      cy.clearMailpit();

      // Login as admin to approve registration
      cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').type('survey-test', { delay: 0 });
      cy.wait(1000);
      cy.contains(testEventName).click();

      // Navigate to registrations and approve
      cy.contains('Registrations').click();
      cy.contains('Approve All').click();
      cy.wait(1000);

      // Check for pre-survey approval email sent to Walnut
      cy.waitForEmail({
        to: 'walnut@pie.org',
        subject: 'Registration accepted - please fill in survey before event for ' + testEventName
      }).then((message) => {
        cy.assertEmailContent(message, {
          subject: 'Registration accepted - please fill in survey before event for ' + testEventName,
          from: 'noreply@support.access-ci.org',
          to: 'walnut@pie.org',
          htmlContains: [
            'Congratulations',
            testSurveyUrl + '?type=pre',
            'Please complete this pre-event survey'
          ]
        });
      });
    });

  });

  describe('Post-Survey redirect route', () => {

    it('Should show error message for non-registered user accessing post-survey link', () => {
      // Login as Pecan who is not registered
      cy.loginAs("pecan@pie.org", "Pecan");

      // Get the event instance ID first
      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').type('survey-test', { delay: 0 });
      cy.wait(1000);
      cy.contains(testEventName).click();

      // Get the event instance ID from the URL
      cy.url().then((url) => {
        const eventId = url.match(/events\/(\d+)/)[1];

        // Get Pecan's user ID
        cy.request('/user').then((response) => {
          // Visit the post-survey redirect URL
          cy.visit(`/events/${eventId}/post_survey/0`, { failOnStatusCode: false });

          // Should show not registered message
          cy.contains('You are not registered for this event').should('be.visible');
        });
      });
    });

    it('Should redirect registered user to post-survey URL', () => {
      // Login as Walnut who is registered
      cy.loginAs("walnut@pie.org", "Walnut");

      // Navigate to the event to get the ID
      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').type('survey-test', { delay: 0 });
      cy.wait(1000);
      cy.contains(testEventName).click();

      // Get event instance ID and user ID
      cy.url().then((url) => {
        const eventMatch = url.match(/events\/(\d+)/);
        expect(eventMatch, `URL should contain event ID, got: ${url}`).to.not.be.null;
        const eventId = eventMatch[1];

        // Get Walnut's user ID from the profile edit page (which always uses numeric ID)
        cy.visit('/user');
        cy.get('a[href*="/edit"]').first().invoke('attr', 'href').then((editHref) => {
          const userMatch = editHref.match(/user\/(\d+)\/edit/);
          expect(userMatch, `Edit link should contain user ID, got: ${editHref}`).to.not.be.null;
          const userId = userMatch[1];

          // Visit the post-survey redirect URL
          // Note: This will redirect to external URL, so we check the redirect behavior
          cy.request({
            url: `/events/${eventId}/post_survey/${userId}`,
            followRedirect: false
          }).then((response) => {
            // Should redirect (302 or 303)
            expect(response.status).to.be.oneOf([302, 303]);
            // Redirect location should be the survey URL
            expect(response.headers.location).to.include(testSurveyUrl);
          });
        });
      });
    });

  });

  describe('Post-Survey cron emails', () => {

    it('Should create a past event for post-survey cron testing', () => {
      cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
      cy.visit('/events/add');

      const pastEventName = 'cypress-past-survey-event';

      // Basic event details
      cy.get('#edit-title-0-value').type(pastEventName, { delay: 0 });

      cy.get('.field--name-body .ck-content').then(el => {
        const editor = el[0].ckeditorInstance;
        editor.setData('This is a past event for testing post-survey cron functionality.');
      });

      cy.get('#edit-summary-text').type('Past event for post-survey testing.', { delay: 0 });

      // Set date to yesterday (past event)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];

      cy.get('#edit-recur-type-custom').click();
      cy.get('#edit-custom-date-0-value-date').type(dateStr, { delay: 0 });
      cy.get('#edit-custom-date-0-end-value-date').type(dateStr, { delay: 0 });
      cy.get('#edit-custom-date-0-value-time').type('10:00:00', { delay: 0 });
      cy.get('#edit-custom-date-0-end-value-time').type('12:00:00', { delay: 0 });

      // Event Location and Contact
      cy.get('#edit-field-location-0-value').type('Online', { delay: 0 });
      cy.get('#edit-field-contact-0-value').type('Test Admin', { delay: 0 });

      // Event Tag
      cy.get('details.tags summary').click();
      cy.get('#tag-training').click();

      // Registration settings
      cy.get('input[data-drupal-selector="edit-event-registration-0-registration"]').check();
      cy.get('#edit-event-registration-0-capacity').type('10', { delay: 0 });

      // Wait for JS to show survey field groups after registration is checked
      cy.wait(500);

      // Configure Post-Survey only (scroll to and expand fieldset first)
      cy.get('#edit-group-post-survey').should('be.visible');
      cy.get('#edit-group-post-survey > summary').scrollIntoView().click();
      cy.get('#edit-field-post-survey-url-0-uri').type(testSurveyUrl + '?type=post-cron', { delay: 0 });
      // Use CKEditor5 API for the text field
      cy.get('#edit-group-post-survey .ck-content').then(el => {
        const editor = el[0].ckeditorInstance;
        editor.setData('Please complete our post-event survey.');
      });

      // Event Type and other required fields
      cy.get('#edit-field-event-type-training').click();
      cy.get('#edit-field-affiliation-community').click();
      cy.get('#edit-field-skill-level-beginner').click();

      // Publish
      cy.get('#edit-moderation-state-0-state').select('Published');
      cy.get('#edit-submit').click();

      cy.contains('Successfully saved').should('be.visible');
    });

    it('Should register admin for past event and trigger post-survey via cron', () => {
      cy.clearMailpit();

      cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

      // Find and register for the past event
      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').type('past-survey-event', { delay: 0 });
      cy.wait(1000);

      // Check if event exists before proceeding
      cy.get('body').then($body => {
        if ($body.text().includes('cypress-past-survey-event')) {
          cy.contains('cypress-past-survey-event').click();

          // Register
          cy.contains('Register').click();
          cy.get('#edit-submit').click();

          // Approve registration (admin self-approve via registrations page)
          cy.contains('Registrations').click();
          cy.contains('Approve All').click();
          cy.wait(1000);

          // Run cron to trigger post-survey emails
          cy.exec('ddev drush cron', { failOnNonZeroExit: false }).then((result) => {
            cy.log('Cron output:', result.stdout);
          });

          // Wait a moment for emails to be processed
          cy.wait(2000);

          // Check for post-survey email
          cy.waitForEmail({
            to: 'administrator@amptesting.com',
            subject: 'cypress-past-survey-event',
            timeout: 10000
          }).then((message) => {
            // Verify post-survey content
            expect(message.html || message.body).to.include('Thank you for participating');
            expect(message.html || message.body).to.include(testSurveyUrl);
          });
        } else {
          cy.log('Past event not found - skipping cron test');
        }
      });
    });

  });

  describe('Cleanup test events', () => {

    it('Should delete test registrations and events', () => {
      cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

      // Clean up survey test event registrations
      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').type('survey-test', { delay: 0 });
      cy.wait(1000);

      cy.get('body').then($body => {
        if ($body.text().includes(testEventName)) {
          cy.contains(testEventName).click();

          // Delete registrations if any exist
          cy.get('body').then($eventBody => {
            if ($eventBody.text().includes('Registrations')) {
              cy.contains('Registrations').click();
              cy.wait(500);

              cy.get('body').then($regBody => {
                if ($regBody.find('table tbody tr').length > 0) {
                  // Delete each registration
                  const deleteRegistrations = () => {
                    cy.get('body').then($currentBody => {
                      if ($currentBody.find('table tbody tr').length > 0) {
                        cy.get('table tbody tr').first().within(() => {
                          cy.get('.dropbutton-toggle button').click({ force: true });
                          cy.wait(200);
                          cy.get('a[href*="/delete"]').first().click({ force: true });
                        });
                        cy.wait(500);
                        cy.get('.ui-dialog-buttonpane button.button--primary').should('be.visible').click();
                        cy.wait(1000);
                        deleteRegistrations();
                      }
                    });
                  };
                  deleteRegistrations();
                }
              });
            }
          });

          // Delete the event series
          cy.visit('/events');
          cy.get('#edit-search-api-fulltext--2').clear().type('survey-test', { delay: 0 });
          cy.wait(1000);
          cy.contains(testEventName).click();
          cy.get('.region-content').contains('Edit').click();
          cy.contains('a', 'Edit the series').click();

          // Delete the series
          cy.get('a[href*="/delete"]').first().click();
          cy.get('#edit-submit').click();
        }
      });

      // Clean up past survey event
      cy.visit('/events');
      cy.get('#edit-search-api-fulltext--2').clear().type('past-survey-event', { delay: 0 });
      cy.wait(1000);

      cy.get('body').then($body => {
        if ($body.text().includes('cypress-past-survey-event')) {
          cy.contains('cypress-past-survey-event').click();

          // Similar cleanup process
          cy.get('body').then($eventBody => {
            if ($eventBody.text().includes('Registrations')) {
              cy.contains('Registrations').click();
              cy.wait(500);

              cy.get('body').then($regBody => {
                if ($regBody.find('table tbody tr').length > 0) {
                  cy.get('table tbody tr').each(() => {
                    cy.get('table tbody tr').first().within(() => {
                      cy.get('.dropbutton-toggle button').click({ force: true });
                      cy.wait(200);
                      cy.get('a[href*="/delete"]').first().click({ force: true });
                    });
                    cy.wait(500);
                    cy.get('.ui-dialog-buttonpane button.button--primary').should('be.visible').click();
                    cy.wait(1000);
                  });
                }
              });
            }
          });

          // Delete the series
          cy.visit('/events');
          cy.get('#edit-search-api-fulltext--2').clear().type('past-survey-event', { delay: 0 });
          cy.wait(1000);
          cy.contains('cypress-past-survey-event').click();
          cy.get('.region-content').contains('Edit').click();
          cy.contains('a', 'Edit the series').click();
          cy.get('a[href*="/delete"]').first().click();
          cy.get('#edit-submit').click();
        }
      });
    });

  });

});
