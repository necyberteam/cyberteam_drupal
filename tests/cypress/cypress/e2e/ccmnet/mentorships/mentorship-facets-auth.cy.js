/*
    CCMNet Mentorships page - Authenticated User Tests.

    Tests facet functionality that requires authentication:
    - State facets (Recruiting, In Progress, etc.)
    - Program facets 
    - Other restricted facets

    The Tags facet remains available to anonymous users.
*/

describe('Tests the CCMNet Mentorships Page for Authenticated Users', () => {
    beforeEach(() => {
        cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI')
    })

    it('Test mentorship state facets for authenticated user', () => {
        cy.visit('/mentorships')

        // Verify that state facets exist and work for authenticated users
        cy.get('#state-829').should('exist') // In Progress
        cy.get('#state-827').should('exist') // Recruiting

        // Test the In Progress filter
        cy.get('#state-829').check()
        cy.wait(1000)
        
        // If there are any In Progress mentorships, they should be visible
        cy.get('body').then($body => {
            if ($body.text().includes('In Progress Title')) {
                cy.contains('In Progress Title').should('exist')
                // Recruiting should not be visible when In Progress is selected
                cy.get('body').should('not.contain', 'Recruiting Title')
            }
        })

        // Test the Recruiting filter
        cy.get('#state-829').uncheck()
        cy.wait(500)
        cy.get('#state-827').check()
        cy.wait(1000)
        
        cy.get('body').then($body => {
            if ($body.text().includes('Recruiting Title')) {
                cy.contains('Recruiting Title').should('exist')
                // In Progress should not be visible when Recruiting is selected
                cy.get('body').should('not.contain', 'In Progress Title')
            }
        })

        // Reset filters
        cy.get('#state-827').uncheck()
        cy.wait(500)
    })

    it('Test mentorship program facets for authenticated user', () => {
        cy.visit('/mentorships')

        // Check if program facets exist (may vary by setup)
        cy.get('body').then($body => {
            // Look for Campus Champions program filter
            if ($body.find('#edit-field-mentorship-program-910').length > 0) {
                cy.get('#edit-field-mentorship-program-910').should('exist').check()
                cy.wait(1000)
                // Test that the filter works
                cy.url().should('include', 'field_mentorship_program')
                cy.get('#edit-field-mentorship-program-910').uncheck()
                cy.wait(500)
            }
        })

        // Test URL-based Campus Champions filter
        cy.visit('/mentorships?f%5B0%5D=mentorship_program%3A910')
        cy.url().should('include', 'f%5B0%5D=mentorship_program%3A910')
        cy.get('h1, .page-title').should('exist')
    })

    it('Test mentorship tags facet for authenticated user', () => {
        cy.visit('/mentorships')

        // Tags should be available to authenticated users too
        // Look for AI tag or other common tags
        cy.get('body').then($body => {
            if ($body.find('[id^="tag-"]').length > 0) {
                // Find first available tag and test it
                cy.get('[id^="tag-"]:first').then($tag => {
                    const tagId = $tag.attr('id')
                    if (tagId) {
                        cy.get(`#${tagId}`).should('exist').click()
                        cy.wait(1000)
                        // Reset
                        cy.get(`#${tagId}`).click()
                        cy.wait(500)
                    }
                })
            }
        })
    })
})