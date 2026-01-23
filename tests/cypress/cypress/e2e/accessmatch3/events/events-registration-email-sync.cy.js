/**
 * Test that changing a user's email updates their event registration email.
 *
 * When a user changes their email address, their existing event registrations
 * should be updated to use the new email address. This ensures that event
 * notifications are sent to the correct email.
 *
 * @see access_misc_user_update()
 */
describe('Event Registration Email Sync', () => {
  const testUser = {
    uid: 199,
    originalEmail: 'walnut@pie.org',
    newEmail: 'walnut-updated@pie.org',
    password: 'Walnut',
    firstName: 'Walnut'
  };

  beforeEach(() => {
    // Ensure the test user has the original email before each test
    cy.exec(`ddev drush sqlq "UPDATE users_field_data SET mail = '${testUser.originalEmail}' WHERE uid = ${testUser.uid}"`, { failOnNonZeroExit: false });
  });

  afterEach(() => {
    // Reset the user's email back to the original after each test
    cy.exec(`ddev drush sqlq "UPDATE users_field_data SET mail = '${testUser.originalEmail}' WHERE uid = ${testUser.uid}"`, { failOnNonZeroExit: false });
  });

  it('Should update registration email when user email changes', () => {
    // Step 1: Register for an event with the original email
    cy.loginAs(testUser.originalEmail, testUser.password);

    cy.visit('/events');
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 });
    cy.wait(1000);
    cy.contains('cypress-example-event').click();

    // Check if already registered, if so, view the registration
    cy.get('body').then($body => {
      if ($body.text().includes('Your Registration')) {
        // Already registered, delete it first
        cy.contains('Your Registration').click();
        cy.get('a[href*="/delete"]').click({ force: true });
        cy.wait(500);
        cy.get('.ui-dialog-buttonpane button.button--primary, #edit-submit').first().click({ force: true });
        cy.wait(1000);
        cy.visit('/events');
        cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 });
        cy.wait(1000);
        cy.contains('cypress-example-event').click();
      }
    });

    cy.contains('Register').click();
    cy.contains('Please confirm your registration below');
    cy.get('#edit-submit').click();
    cy.contains(/Successfully registered|registration/i);

    // Step 2: Verify the registration was created with the original email
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    cy.visit('/events');
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 });
    cy.wait(1000);
    cy.contains('cypress-example-event').click();
    cy.contains('Registrations').click();
    cy.wait(1000);

    // Verify registration exists with original email
    cy.contains('tr', testUser.firstName).should('contain', testUser.originalEmail);

    // Step 3: Update the user's email address through Drupal (triggers hook_user_update)
    cy.exec(`ddev drush php:eval "\\$user = \\Drupal\\user\\Entity\\User::load(${testUser.uid}); \\$user->setEmail('${testUser.newEmail}'); \\$user->save();"`, { failOnNonZeroExit: false });

    // Step 4: Verify the registration email was updated
    cy.reload();
    cy.wait(1000);

    // The registration should now show the new email
    cy.contains('tr', testUser.firstName).should('contain', testUser.newEmail);
    cy.contains('tr', testUser.firstName).should('not.contain', testUser.originalEmail);

    // Cleanup: Delete the registration
    cy.contains('tr', testUser.firstName).within(() => {
      cy.get('.dropbutton-toggle button').click({ force: true });
      cy.wait(200);
      cy.get('a[href*="/delete"]').first().click({ force: true });
    });
    cy.wait(500);
    cy.get('.ui-dialog-buttonset button').first().click();
  });
});
