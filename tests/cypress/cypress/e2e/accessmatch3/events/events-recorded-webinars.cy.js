/*
  Test the Recorded Events and Trainings page (md-2627)

  This page displays recorded webinars with filters for:
  - Topic
  - Affinity Group
  - Skill Level
*/

describe('Recorded Events and Trainings page', () => {

  it('Should display the page with correct title and intro text', () => {
    cy.visit('/knowledge-base/recorded-events-and-trainings');

    // Page title
    cy.get('h1').contains('Recorded Events and Trainings');

    // Intro text
    cy.contains('Watch videos from past events');
  });

  it('Should display facet filters', () => {
    cy.visit('/knowledge-base/recorded-events-and-trainings');

    // Topic facet
    cy.contains('Topic').should('be.visible');

    // Affinity Group facet
    cy.contains('Affinity Group').should('be.visible');

    // Skill Level facet
    cy.contains('Skill Level').should('be.visible');
  });

  it('Should display webinar results', () => {
    cy.visit('/knowledge-base/recorded-events-and-trainings');

    // Should have some webinar results displayed
    cy.get('.views-row, .view-content').should('exist');
  });

  it('Should have working search/filter functionality', () => {
    cy.visit('/knowledge-base/recorded-events-and-trainings');

    // Check if there's a search input and it's functional
    cy.get('input[type="text"], input[type="search"]').first().then($input => {
      if ($input.length) {
        const inputSelector = `input[name="${$input.attr('name')}"]`;

        // Type a search term
        cy.get(inputSelector).type('test', { delay: 0 });
        cy.wait(1000);

        // Re-query the input after DOM update and clear it
        cy.get(inputSelector).clear();
        cy.wait(1000);
      }
    });
  });

  it('Should have clickable tag links that use correct path aliases', () => {
    cy.visit('/knowledge-base/recorded-events-and-trainings');

    // Find tag links within the webinar results
    cy.get('body').then($body => {
      // Look for tag links in list format
      const tagLinks = $body.find('ul li a[href^="/tags/"]');

      if (tagLinks.length > 0) {
        // Verify tag links have valid href (not containing double slashes or broken paths)
        cy.get('ul li a[href^="/tags/"]').first().then($link => {
          const href = $link.attr('href');

          // Href should start with /tags/ and not have double slashes
          expect(href).to.match(/^\/tags\/[a-z0-9-]+$/);

          // Click the link and verify it doesn't 404
          cy.wrap($link).click();
          cy.url().should('include', '/tags/');

          // Should not be a 404 page
          cy.get('body').should('not.contain', 'Page not found');
        });
      }
    });
  });

});
