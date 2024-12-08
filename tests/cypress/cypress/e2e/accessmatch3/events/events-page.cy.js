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

    cy.contains('Upcoming Events')
    cy.contains('Past Events')
    cy.contains('My Events')
    cy.contains('+ Add Event')

    cy.get('#custom-event-type-training').check()
    cy.wait(1000)
    cy.get('#custom-event-affiliation-community').check()
    cy.wait(1000)
    cy.get('#custom-event-skill-level-advanced').check()
    cy.wait(1000)
    cy.contains('example-event')
    cy.contains('Zoom')
    cy.contains('12/12/26')
    cy.get('[href="/tags/login"]').contains('login')

    cy.get('#custom-event-type-reset-all').check()
    cy.wait(1000)
    cy.get('#custom-event-affiliation-reset-all').check()
    cy.wait(1000)
    cy.get('#custom-event-skill-level-reset-all').check()

    cy.get('#edit-search-api-fulltext--2').type('Random string')
    cy.wait(1000)
    cy.contains('No Events Found')

    cy.get('#edit-search-api-fulltext--2').clear()
    cy.wait(1000)
    cy.get('#edit-search-api-fulltext--2').type('example')
    cy.wait(1000)
    cy.contains('example-event')
    cy.contains('Zoom')
    cy.contains('12/12/26')
    cy.get('[href="/tags/login"]').contains('login')
    cy.contains('example-event').click()


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
