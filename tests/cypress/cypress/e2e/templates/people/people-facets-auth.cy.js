/*
    People page - Authenticated User Tests.

    Tests facet functionality that requires authentication:
    - Programs facet
    - Organization facet
    
    The Skills facet remains available to anonymous users.
*/

describe("Test people page Card view with all facets for authenticated users", () => {

  beforeEach(() => {
    cy.loginWith('authenticated@amptesting.com', '6%l7iF}6(4tI')
  })

  it("Authenticated user tests the people page in Card View with all filters", () => {
    cy.visit('/people');
    
    // Page elements
    cy.contains('People');
    
    // All facets should be visible to authenticated users
    cy.contains('Programs');
    cy.contains('Skills')
    cy.contains('Organization')

    // Test search functionality
    cy.get('#edit-search-api-fulltext--2').type('testing123', { delay: 0 })
    cy.wait(1000)
    cy.contains('No matches found')

    cy.get('#edit-search-api-fulltext--2').clear()
    cy.wait(1000)
    cy.get('#edit-search-api-fulltext--2').type('julie', { delay: 0 })
    cy.wait(1000)
    cy.contains('Julie Ma')

    cy.get('#edit-search-api-fulltext--2').clear()
    cy.wait(1000)

    // Test Programs facet (requires authentication)
    cy.get('#program-308').should('exist').click();
    cy.contains('Programs Northeast')
    cy.get('#program-reset-all').click();

    // Test Organization facet (requires authentication)
    cy.get('#block-nect-organizationcyberteampeople .facets-soft-limit-link').should('exist').click();
    cy.get('#organization-cyberteam-people-1931').should('exist').click();
    cy.contains('Harvard University')
    cy.get('#organization-cyberteam-people-reset-all').click();

    // Test Skills facet (available to all users)
    cy.get('#block-nect-userskillscyberteampeople .facets-soft-limit-link').should('exist').click();
    cy.get('#user-skills-cyberteam-people-llm').should('exist').click();
    cy.contains('llm')
    cy.get('#user-skills-cyberteam-people-bash').click();
  });

  it("Test multiple facets interaction for authenticated user", () => {
    cy.visit('/people');

    // Test combining multiple facets
    cy.get('body').then($body => {
      // Check if program facet exists
      if ($body.find('#program-308').length > 0) {
        cy.get('#program-308').click();
        cy.wait(1000)
        
        // Add organization filter on top of program filter
        if ($body.find('#organization-cyberteam-people-1931').length > 0) {
          cy.get('#organization-cyberteam-people-1931').click();
          cy.wait(1000)
          
          // Reset all filters
          cy.get('#program-reset-all').click();
          cy.wait(500)
          if ($body.find('#organization-cyberteam-people-reset-all').length > 0) {
            cy.get('#organization-cyberteam-people-reset-all').click();
          }
        }
      }
    })
  });

});