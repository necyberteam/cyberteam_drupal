describe('Test the registration feature', () => {

  it('Approve registration as admin', () => {
    cy.clearMailpit();

    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()
    cy.contains('Register').click()

    cy.get('#edit-submit').click()

    cy.contains('You will receive an email after your registration is approved')
    cy.contains('Approved: No')

    // Check for pending registration email
    cy.waitForEmail({
      to: 'administrator@amptesting.com',
      subject: 'Registration Pending for cypress-example-event'
    }).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Registration Pending for cypress-example-event',
        from: 'noreply@support.access-ci.org',
        to: 'administrator@amptesting.com',
        htmlContains: 'You will receive another email once your registration has been reviewed and approved. Approval typically takes 1-2 business days'
      });
    });

    cy.contains('Registrations').click()
    cy.contains('Approve All').click()
    cy.wait(1000)

    cy.contains('Cypress-example-event').click()

    cy.contains('Approved: Yes')

    // Check for approved registration email
    cy.waitForEmail({
      to: 'administrator@amptesting.com',
      subject: 'Registration Confirmed for cypress-example-event'
    }).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Registration Confirmed for cypress-example-event',
        from: 'noreply@support.access-ci.org',
        to: 'administrator@amptesting.com',
        htmlContains: 'Congratulations! Your registration for&nbsp;'
      });
    });
  })

  it('Walnut register for event', () => {
    cy.loginAs("walnut@pie.org", "Walnut");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()
    cy.contains('Register').click()
    cy.contains('Please confirm your registration below')
    cy.get('#edit-submit').click()

    cy.contains('Successfully registered to the waitlist.')
    cy.contains('Approved: No')
    cy.contains('Waitlist: Yes')

    // Check for waitlist registration email
    cy.waitForEmail({
      to: 'walnut@pie.org',
      subject: 'Waitlist Status for cypress-example-event'
    }).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Waitlist Status for cypress-example-event',
        from: 'noreply@support.access-ci.org',
        to: 'walnut@pie.org',
        htmlContains: 'At this time, the session is full, and your registration has been placed on the waitlist'
      });
    });

  })

  it('Approve Walnut registration as admin', () => {
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    cy.contains('Registrations').click()
    cy.contains('Approve All').click()
  })

  it('Walnut check registration status', () => {
    cy.loginAs("walnut@pie.org", "Walnut");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    cy.contains('Approved: Yes')

    // Check for waitlist registration email
    cy.waitForEmail({
      to: 'walnut@pie.org',
      subject: 'Registration Confirmed for cypress-example-event'
    }).then((message) => {
      cy.assertEmailContent(message, {
        subject: 'Registration Confirmed for cypress-example-event',
        from: 'noreply@support.access-ci.org',
        to: 'walnut@pie.org',
        htmlContains: 'has been confirmed'
      });
    });

  })

  it('Should verify registration page UI enhancements', () => {
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()
    cy.contains('Registrations').click()

    // Verify event title appears in page title
    cy.title().should('include', 'cypress-example-event')

    // Verify # column exists in the registration table
    cy.get('table thead th').first().should('contain', '#')

    // Verify Total Registrants display exists (e.g., "2 of 25 registrants")
    // The text pattern should match "X of Y registrants" where X and Y are numbers
    cy.contains(/\d+\s+of\s+\d+\s+registrants/i).should('be.visible')

    // Verify the registration table has numbered rows
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').first().should('match', /\d+/)
    })
  })

})
