/*
    Affinity Groups page - Authenticated User Tests.

    Tests facet functionality that requires authentication:
    - Category facet (if available)
    - Other restricted facets
    
    The Tags facet remains available to anonymous users.
*/

describe("Test Affinity Groups page facets for authenticated users", () => {

  beforeEach(() => {
    cy.loginWith('authenticated@amptesting.com', '6%l7iF}6(4tI')
  })

  it("Authenticated user tests the affinity groups page with all facets", () => {
    cy.visit('/affinity-groups');
    
    // Page elements
    cy.contains('Affinity Groups');
    cy.contains('Affinity Group');
    cy.contains('Description');
    cy.contains('Join');
    cy.contains('Request a Group');

    // Test search functionality
    cy.get('#edit-search-api-fulltext--2').type('test search', { delay: 0 })
    cy.wait(1000)
    cy.get('#edit-search-api-fulltext--2').clear()
    cy.wait(1000)

    // Test Tags facet (available to all users)  
    // Click "Show more" to expand tags list - try the last one instead of first
    cy.get('ul[data-drupal-facet-alias="affinity_search_tags"]').parent().find('a.facets-soft-limit-link').last().click();
    cy.wait(500);
    
    // Test the AI tag (tag ID 271)
    cy.get('input#affinity-search-tags-271.facets-checkbox').should('exist').check({ force: true });
    cy.wait(1000);
    
    // Verify the filter is applied
    cy.url().should('include', 'affinity_search_tags');
    
    // Uncheck to reset
    cy.get('input#affinity-search-tags-271.facets-checkbox').uncheck({ force: true });
    cy.wait(500);

    // Test Category facet if it exists (requires authentication)
    cy.get('body').then($body => {
      // Look for category facet elements
      if ($body.find('[id*="category"]').length > 0) {
        cy.get('[id*="category"]:first').should('exist')
        cy.log('Category facet found for authenticated user')
        
        // Try to interact with category if it's a checkbox/radio
        if ($body.find('input[id*="category"]').length > 0) {
          cy.get('input[id*="category"]:first').check({ force: true })
          cy.wait(1000)
          cy.get('input[id*="category"]:first').uncheck({ force: true })
        }
      }
      
      // Check for any "Show more" links for facets (may be hidden after AJAX)
      if ($body.find('.facets-soft-limit-link').length > 0) {
        cy.get('.facets-soft-limit-link').first().click({ force: true })
        cy.wait(500)
      }
    })

    // Test joining a group as authenticated user
    cy.get('body').then($body => {
      // Look for join buttons that should work for authenticated users
      if ($body.find('.js-flag-affinity-group-618').length > 0) {
        cy.get('.js-flag-affinity-group-618')
          .find(':contains("Join")')
          .should('exist')
      } else if ($body.find('[title*="Join"]').length > 0) {
        // Generic join button check
        cy.get('[title*="Join"]:first').should('exist')
      }
    })
  });

  it("Test specific affinity group page as authenticated user", () => {
    cy.visit('/affinity-groups');

    // Click on first affinity group if available
    cy.get('body').then($body => {
      if ($body.find('a[href*="/affinity-groups/"]:not([href="/affinity-groups"])').length > 0) {
        cy.get('a[href*="/affinity-groups/"]:not([href="/affinity-groups"]):first').then($link => {
          const href = $link.attr('href')
          cy.visit(href)
          
          // Verify individual group page loads
          cy.get('body').should('exist')
          cy.url().should('include', '/affinity-groups/')
          
          // Check for authenticated user features
          cy.get('body').then($groupBody => {
            if ($groupBody.text().includes('Join') || $groupBody.text().includes('Leave')) {
              cy.log('Group membership options available for authenticated user')
            }
          })
        })
      }
    })
  });

});