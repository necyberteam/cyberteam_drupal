/*
    This test is specifically focused on the Events page tested for an unauthenticated user.
    This test checks for major functions like:
    Filter Functionality,
    Headers,
    Testing created event

    Test breadcrumbs

*/
describe('Unauthenticated user tests the Events Page', () => {
  it('Should test the Events page for unauthenticated user', () => {
    cy.visit('/events')

    // Page title and column headers
    cy.get('.page-title').contains('Events')
    cy.get('table thead').contains('Event Name')
    cy.get('table thead').contains('Date')
    cy.get('#view-body-format-table-column').contains('Description')

    // Filter feature
    cy.get('#edit-field-affiliation-value--2').select('Community') // Affiliation field
    cy.get('#edit-field-event-type-value--2').select('Training') // Event Type
    cy.get('#edit-tid--2').select('login') // Tag field
    cy.get('#edit-field-skill-level-value--2').select('Advanced') // Skill Level
    cy.get('#edit-submit-recurring-events-event-instances--2').click() // Submit button

    // Testing Cypress Created Event
    // Event Title
    cy.get('tbody > tr > .views-field-title-2')
      .contains('example-event')
      .click()
    cy.get('.page-title > .field').contains('example-event')

    // Event Date
    cy.get('.field--name-date').contains(
      '12/12/26'
    )

    // Event Location
    cy.get('.field--name-location').contains('Zoom')

    // Event Tags
    cy.get('.field__item.me-2 a').contains('login')

    //Event Contact
    cy.get('.field--name-contact').contains('Contact')
    cy.get('.field--name-contact').contains('Pecan Pie')

    // Registration Button Not sure how to correctly reference the btn
    cy.get('.field__item .btn').contains('Register')
      .should('have.attr', 'href')

    // Event Skill Level
    cy.get('.field--name-skill-level').contains('Skill Level')
    cy.get('.field--name-skill-level img[alt="Advanced"]').should('be.visible')

    // Event Type
    cy.get('.field--name-event-type').contains('Event Type')
    cy.get('.field--name-event-type').contains('Training')
  })
})
