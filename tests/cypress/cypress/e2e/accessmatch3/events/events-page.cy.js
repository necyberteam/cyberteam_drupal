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
    cy.contains('cypress-example-event')
      .closest('.views-row')
      .within(() => {
        cy.contains('Zoom');
        cy.get('.views-field-date-1')
          .find('.text-dark-teal')
          .within(() => {
            cy.get('div.text-4xl').should('have.text', '12');
            cy.get('div.text-xl').eq(1).should('have.text', 'Dec');
          });
        cy.get('[href="/tags/login"]').contains('login');
      });

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
    cy.contains('cypress-example-event')
      .closest('.views-row')
      .within(() => {
        cy.contains('Zoom');
        cy.get('.views-field-date-1')
          .find('.text-dark-teal')
          .within(() => {
            cy.get('div.text-4xl').should('have.text', '12');
            cy.get('div.text-xl').eq(1).should('have.text', 'Dec');
          });
        cy.get('[href="/tags/login"]').contains('login');
      });
    cy.contains('cypress-example-event').click()


    // Event Date
    cy.get('.field--name-date').contains(
      '12/12/26'
    )

    // Event Location
    cy.get('.field--name-location').contains('Zoom')

    // Event Tags
    cy.get('.field__item.me-2 a').contains('login')

    //Event Contact
    cy.get('#block-asptheme-eventinstancesidebar').contains('Contact')
    cy.get('#block-asptheme-eventinstancesidebar').contains('Pecan Pie')

    // Registration Button Not sure how to correctly reference the btn
    cy.get('.field__item .btn').contains('Register')
      .should('have.attr', 'href')

    // Event Skill Level
    cy.get('#block-asptheme-eventinstancesidebar').contains('Skill Level')
    cy.get('#block-asptheme-eventinstancesidebar img[alt="Advanced"]').should('be.visible')

    // Event Type
    cy.get('#block-asptheme-eventinstancesidebar').contains('Event Type')
    cy.get('#block-asptheme-eventinstancesidebar').contains('Training')
  })
})
