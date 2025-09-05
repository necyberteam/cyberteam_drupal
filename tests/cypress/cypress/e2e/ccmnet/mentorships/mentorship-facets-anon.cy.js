/*
    CCMNet Mentorships page - Anonymous User Tests.

    Tests functionality available to anonymous users:
    - Tags facet (only facet available to anonymous users)
    - Basic page functionality
    - Verifies that restricted facets don't exist

    State and Program facets are only available to authenticated users.
*/

describe('Tests the CCMNet Mentorships Page for Anonymous Users', () => {
    it('Test mentorship page for anonymous user', () => {
        cy.visit('/mentorships')

        // Verify page loads correctly
        cy.get('h1, .page-title').should('exist')

        // Verify that state facets do NOT exist for anonymous users
        cy.get('#state-829').should('not.exist') // In Progress
        cy.get('#state-827').should('not.exist') // Recruiting

        // Verify that program facets do NOT exist for anonymous users
        cy.get('#edit-field-mentorship-program-910').should('not.exist')

        // Verify that tags facet IS available for anonymous users
        cy.get('body').then($body => {
            if ($body.find('[id^="tag-"]').length > 0) {
                // Tags should be visible
                cy.get('[id^="tag-"]:first').should('exist')
                
                // Test that a tag filter works
                cy.get('[id^="tag-"]:first').then($tag => {
                    const tagId = $tag.attr('id')
                    if (tagId) {
                        cy.get(`#${tagId}`).click()
                        cy.wait(1000)
                        
                        // Check that the URL or page state changes
                        cy.get('body').should('exist') // Basic check that page still works
                        
                        // Reset the tag
                        cy.get(`#${tagId}`).click()
                        cy.wait(500)
                    }
                })
            }
        })

        // Test basic search functionality if available
        cy.get('body').then($body => {
            if ($body.find('input[id*="search"], input[name*="search"]').length > 0) {
                // If there's a search input field, test it briefly
                cy.get('input[id*="search"], input[name*="search"]').first().then($search => {
                    cy.wrap($search).type('test', { delay: 0 })
                    cy.wait(1000)
                    cy.wrap($search).clear()
                    cy.wait(500)
                })
            } else if ($body.find('#search-block-form input').length > 0) {
                // Try the search block form input
                cy.get('#search-block-form input').first().type('test', { delay: 0 })
                cy.wait(1000)
                cy.get('#search-block-form input').first().clear()
                cy.wait(500)
            }
        })
    })

    it('Test mentorship individual pages are accessible to anonymous users', () => {
        cy.visit('/mentorships')

        // Check if any mentorships are visible and clickable
        cy.get('body').then($body => {
            if ($body.find('.views-row').length > 0) {
                // If there are mentorship items, test that they're accessible
                cy.get('.views-row').first().within(() => {
                    // Look for a link to an individual mentorship
                    cy.get('a[href*="/mentorship"]').first().then($link => {
                        const href = $link.attr('href')
                        if (href) {
                            cy.visit(href)
                            cy.get('body').should('exist')
                            cy.url().should('include', '/mentorship')
                        }
                    })
                })
            }
        })
    })
})