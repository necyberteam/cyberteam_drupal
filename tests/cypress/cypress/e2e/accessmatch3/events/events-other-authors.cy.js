/*
  Test the Other Authors feature for Event Series (md-2549)

  This feature adds an "Other Authors" entity reference field to Event Series
  that allows additional users to be selected who will have edit access to both
  the Event Series and its associated Event Instances.

  Field details:
  - Machine name: field_other_authors
  - Label: "Other Authors"
  - Description: "Give edit access to other people."
  - Widget: entity_reference_autocomplete
  - Cardinality: unlimited
*/

describe('Test Other Authors feature for Event Series', () => {

  it('Event creator should be able to add other authors', () => {
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Navigate to edit the event instance first
    cy.get('.region-content').contains('Edit').click()

    // Then navigate to edit the series from the instance edit page
    cy.contains('a', 'Edit the series').click()

    // Verify the Other Authors field exists
    cy.contains('Other Authors').should('be.visible')
    cy.get('input[name="field_other_authors[0][target_id]"]').should('exist')

    // Verify the field description
    cy.contains('Give edit access to other people').should('be.visible')

    // Check if Walnut is already added, if not add them
    cy.get('body').then($body => {
      const walnutExists = $body.text().includes('Walnut Pie')
      if (!walnutExists) {
        // Add Walnut Pie as an other author using autocomplete
        cy.get('input[name="field_other_authors[0][target_id]"]').clear().type('Walnut')
        cy.wait(1000)

        // Select from autocomplete dropdown
        cy.get('.ui-autocomplete').should('be.visible')
        cy.get('.ui-autocomplete').contains('Walnut').click()
      }
    })

    // Save the event series
    cy.get('#edit-submit').click()
    cy.contains('Successfully saved').should('be.visible')
  })

  it('Other author should be able to edit Event Series', () => {
    cy.loginAs("walnut@pie.org", "Walnut");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Navigate to edit the event instance first
    cy.get('.region-content').contains('Edit').click()

    // Then navigate to edit the series from the instance edit page
    cy.contains('a', 'Edit the series').click()
    cy.url().should('include', '/edit')

    // Verify we can see the form fields (proves we have edit access)
    cy.get('#edit-title-0-value').should('exist')
    cy.get('#edit-submit').should('be.visible')

    // Verify we can see the Other Authors field (other authors can manage the list)
    cy.contains('Other Authors').should('be.visible')
  })

  it('Other author should be able to edit Event Instances', () => {
    cy.loginAs("walnut@pie.org", "Walnut");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Navigate to edit the event instance
    cy.get('.region-content').contains('Edit').click()

    // Verify we can access edit form for the instance
    cy.url().should('include', '/edit')
    cy.get('#edit-submit').should('be.visible')
  })

  it('Non-author user should NOT be able to edit Event Series', () => {
    // Login as Pecan Pie who is not the creator or an other author
    cy.loginAs("pecan@pie.org", "Pecan");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Verify Edit link is NOT visible or accessible
    cy.get('body').then($body => {
      const editLinks = $body.find('a:contains("Edit")')
      if (editLinks.length > 0) {
        // If there's an Edit link, it should be for user profile, not the event
        cy.get('a:contains("Edit")').each(($el) => {
          cy.wrap($el).invoke('attr', 'href').should('not.match', /eventseries.*\/edit/)
        })
      }
    })
  })

  it('Should allow removing an other author', () => {
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Navigate to edit the event instance first
    cy.get('.region-content').contains('Edit').click()

    // Then navigate to edit the series
    cy.contains('a', 'Edit the series').click()

    // Find and remove Walnut (the other author)
    cy.get('input[name*="field_other_authors"][name*="[target_id]"]').each(($input, index) => {
      cy.wrap($input).invoke('val').then((val) => {
        if (val && val.includes('Walnut')) {
          // Found Walnut - remove them
          cy.get(`input[name="field_other_authors_${index}_remove_button"]`).click()
          cy.wait(500)
        }
      })
    })

    cy.get('#edit-submit').click()
    cy.contains('Successfully saved').should('be.visible')
  })

  it('Removed author should no longer have edit access', () => {
    cy.loginAs("walnut@pie.org", "Walnut");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Verify Edit link is no longer visible for event series
    cy.get('body').then($body => {
      const editLinks = $body.find('a:contains("Edit")')
      if (editLinks.length > 0) {
        cy.get('a:contains("Edit")').each(($el) => {
          cy.wrap($el).invoke('attr', 'href').should('not.match', /eventseries.*\/edit/)
        })
      }
    })
  })

  it('Should cleanup - remove remaining other authors', () => {
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");

    cy.visit('/events')
    cy.get('#edit-search-api-fulltext--2').type('example', { delay: 0 })
    cy.wait(1000)
    cy.contains('cypress-example-event').click()

    // Navigate to edit the event instance first
    cy.get('.region-content').contains('Edit').click()

    // Then navigate to edit the series
    cy.contains('a', 'Edit the series').click()

    // Remove all other authors to clean up for next test run
    cy.get('input[name*="field_other_authors"][name*="_remove_button"]').each(($btn) => {
      cy.wrap($btn).click()
      cy.wait(300)
    })

    cy.get('#edit-submit').click()
    cy.contains('Successfully saved').should('be.visible')
  })

})
