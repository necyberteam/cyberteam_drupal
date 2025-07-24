/*
    CSSN Directory page.

    The CSSN Directory has two columns:
    - left column with a search form, and facets for roles, skills, and organizations.
    - right column with a list of users displaying name, role, organization, and skills.
*/

describe('Tests the CSSN Directory Page', () => {
    it('Test CSSN Directory for anonymous user', () => {
        cy.visit('/community/cssn/directory')

        const crumbs = [
            ['Support', '/'],
            ['Community', '/community/overview'],
            ['CSSN', '/community/cssn'],
            ['Directory', null]
        ];
        cy.checkBreadcrumbs(crumbs);

        // Page Title
        cy.get('.page-title').contains('CSSN Directory')

        // Search form
        cy.get('#edit-search-api-fulltext--2')
            .type('Pasquale')

        cy.get('.cssn-directory-item').as('item')
        cy.get('@item').should('have.length', 1) // Only one user with the name Pasquale
        cy.get('@item').find('.cssn-photo img').verifyImage()

        // Card should link to the community persona page.
        cy.get('@item')
            .find('a.stretched-link')
            .should("have.attr", "href")
            .and("contain", '/community-persona/1373');

        // Organization should be displayed.
        cy.get('@item')
            .find('.leading-5 a')
            .should('contain', 'Massachusetts Green High Performance Computing Center')

        // Tags should be displayed.
        cy.get('@item')
            .find('.square-tags ul li')
            .should('have.length.at.least', 1)
            .find('a')
            .should('have.attr', 'href')
            .and('contain', '/taxonomy/term/')

        // Check roles facet.
        cy.get('#edit-search-api-fulltext--2').clear()
        cy.get('#roles-cip').click()
        cy.get('.cssn-directory-item').as('item')
        cy.get('@item').then(($item) => {
            // There are at least 14 CIPs
            expect($item.length).to.be.at.least(14)

            // add the c++ facet; should reduce the number of users.
            cy.get('#skills-c').click()
            cy.get('.cssn-directory-item').as('item')
            cy.get('@item')
                .should('have.length.at.least', 1)
                .should('have.length.lessThan', $item.length)
        })

        // Reset facets
        cy.get('#roles-cip').click()
        cy.get('#skills-reset-all').click()

        // Check the "Show more" link for Organizations facet.
        cy.get('.block-facet-blockaccess-organization .facets-soft-limit-link')
          .first()
          .click()

        // Check the organizations facet.
        cy.get('#access-organization-4191').click() // Massachusetts Green High Performance Computing Center
        cy.get('.cssn-directory-item').as('item')
        cy.get('@item')
            .should('have.length.at.least', 1)

        // todo: '+ X more' tags text is not currently displaying in Cypress tests.
    })
})
