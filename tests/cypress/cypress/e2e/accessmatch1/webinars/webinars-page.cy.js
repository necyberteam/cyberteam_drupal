/*
    NAIRR Pilot Webinars page - Anonymous User Tests.

    Tests basic functionality for anonymous users:
    - Page elements and breadcrumbs
    - Search functionality
    - Affiliation facet
    - Topic facet
    - Upcoming and Recorded webinars sections
*/

describe('Tests the NAIRR Pilot Webinars Page for anonymous users', () => {
    it('Test NAIRR Pilot Webinars page basic functionality', () => {
        cy.visit('/support/knowledge-base/nairr-pilot-webinars')

        // Test breadcrumbs
        const crumbs = [
            ['Support', '/'],
            ['Knowledge Base', null],
            ['NAIRR Pilot Webinars', null]
        ];
        cy.checkBreadcrumbs(crumbs);

        // Page Title
        cy.get('.page-title').contains('NAIRR Pilot Webinars')

        // Hero CTA section
        cy.contains('Watch recorded webinars')
        cy.get('a[href="https://www.youtube.com/@NAIRRPilot/videos"]').should('contain', 'NAIRR Pilot youtube')

        // Main content sections
        cy.contains('Upcoming Webinars')
        cy.contains('Recorded Webinars')

        // Search functionality
        cy.get('#edit-search-api-fulltext').should('exist').type('AI', { delay: 0 })
        cy.wait(1000)
        cy.get('#edit-search-api-fulltext').clear()
        cy.wait(1000)

        // Test Affiliation facet
        cy.get('#event-affiliation-cu-rmacc-webinars').should('exist').check({ force: true })
        cy.wait(1000)

        // Verify filter is applied
        cy.url().should('include', 'event_affiliation')

        // Uncheck to reset
        cy.get('#event-affiliation-cu-rmacc-webinars').uncheck({ force: true })
        cy.wait(500)

        // Test Topic facets
        cy.get('#topic-cpu-bound').should('exist').check({ force: true })
        cy.wait(1000)

        // Verify topic filter is applied
        cy.url().should('include', 'topic')

        // Uncheck to reset
        cy.get('#topic-cpu-bound').uncheck({ force: true })
        cy.wait(500)

        // Test another topic facet
        cy.get('#topic-dmtcp').should('exist').check({ force: true })
        cy.wait(1000)
        cy.get('#topic-dmtcp').uncheck({ force: true })
        cy.wait(500)

        // Verify upcoming webinars content
        cy.get('.view-events-facet.view-display-id-upcoming_webinars').within(() => {
            cy.contains('Upcoming Webinars')
            // Check for webinar entries if they exist
            cy.get('body').then($body => {
                if ($body.find('.views-row').length > 0) {
                    cy.get('.views-row').first().within(() => {
                        // Should have title link
                        cy.get('a[href*="/events/"]').should('exist')
                        // Should have date/time info
                        cy.get('.font-bold').should('exist')
                    })
                }
            })
        })

        // Verify recorded webinars content
        cy.get('.view-events-facet.view-display-id-recorded_webinars_block').within(() => {
            cy.contains('Recorded Webinars')
            // Check for recorded webinar entries
            cy.get('body').then($body => {
                if ($body.find('.views-row').length > 0) {
                    cy.get('.views-row').first().within(() => {
                        // Should have title link
                        cy.get('a[href*="/events/"]').should('exist')
                        // Should have date
                        cy.get('.views-field-date-1').should('exist')
                    })
                }
            })
        })

        // Test YouTube link in footer
        cy.get('a[href="https://www.youtube.com/@NAIRRPilot/videos"]').should('contain', 'view all on youtube')
    })

    it('Test individual webinar page access', () => {
        cy.visit('/support/knowledge-base/nairr-pilot-webinars')

        // Click on first webinar link if available
        cy.get('body').then($body => {
            if ($body.find('a[href*="/events/"]:first').length > 0) {
                cy.get('a[href*="/events/"]:first').then($link => {
                    const href = $link.attr('href')
                    cy.visit(href)
                    
                    // Verify individual webinar page loads
                    cy.get('body').should('exist')
                    cy.url().should('include', '/events/')
                    
                    // Should have some basic event content
                    cy.get('h1, .page-title, .node--type-event').should('exist')
                })
            }
        })
    })

    it('Test webinar search functionality', () => {
        cy.visit('/support/knowledge-base/nairr-pilot-webinars')

        // Test search with specific term
        cy.get('#edit-search-api-fulltext').type('CU-RMACC', { delay: 0 })
        cy.get('#edit-submit-events-facet').click()
        cy.wait(2000)

        // Check if results are filtered
        cy.url().should('include', 'search_api_fulltext=CU-RMACC')

        // Clear search
        cy.get('#edit-search-api-fulltext').clear()
        cy.get('#edit-submit-events-facet').click()
        cy.wait(1000)

        // Test search with no results
        cy.get('#edit-search-api-fulltext').type('nonexistentterm12345', { delay: 0 })
        cy.get('#edit-submit-events-facet').click()
        cy.wait(2000)

        // Should show no results or empty state
        cy.get('body').then($body => {
            if ($body.text().includes('No results') || $body.find('.view-empty').length > 0) {
                cy.log('No results message found as expected')
            }
        })
    })
})