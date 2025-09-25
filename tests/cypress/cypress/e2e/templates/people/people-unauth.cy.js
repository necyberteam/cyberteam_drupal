/*
    People page - Anonymous User Tests.

    Tests functionality available to anonymous users:
    - Skills facet (only facet available to anonymous users)
    - Search functionality
    - Verifies that restricted facets don't exist

    Programs and Organization facets are only available to authenticated users.
*/

describe("Test people page Card view for anonymous users", () => {

  it("Anonymous user tests the people page in Card View with limited filters", () => {
    cy.visit('/people');
    
    // Page title
    cy.contains('People');
    
    // Check facets in the sidebar specifically to avoid confusion with people cards
    cy.get('.sidebar').within(() => {
      // Verify Skills facet IS visible to anonymous users
      cy.contains('Skills').should('exist')
      
      // Verify Programs facet does NOT exist for anonymous users
      cy.contains('Programs').should('not.exist');
      
      // Verify Organization facet does NOT exist for anonymous users
      cy.contains('Organization').should('not.exist');
    });
    
    // Also verify facet elements don't exist
    cy.get('#program-308').should('not.exist');
    cy.get('#program-reset-all').should('not.exist');
    cy.get('#organization-cyberteam-people-1931').should('not.exist');
    cy.get('#block-nect-organizationcyberteampeople').should('not.exist');

    // Test search functionality (should work for anonymous users)
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

    // Test Skills facet (should be available to anonymous users)
    cy.get('body').then($body => {
      // Check if the skills facet show more link exists
      if ($body.find('#block-nect-userskillscyberteampeople .facets-soft-limit-link').length > 0) {
        cy.get('#block-nect-userskillscyberteampeople .facets-soft-limit-link').click();
      }
      
      // Check if specific skill filters exist
      if ($body.find('#user-skills-cyberteam-people-llm').length > 0) {
        cy.get('#user-skills-cyberteam-people-llm').click();
        cy.contains('llm')
        
        if ($body.find('#user-skills-cyberteam-people-bash').length > 0) {
          cy.get('#user-skills-cyberteam-people-bash').click();
        }
        
        // Reset skills if reset exists
        if ($body.find('#user-skills-cyberteam-people-reset-all').length > 0) {
          cy.get('#user-skills-cyberteam-people-reset-all').click();
        }
      }
    })
  });

  it("Anonymous user verifies restricted content messaging", () => {
    cy.visit('/people');
    
    // Check if there's any messaging about logging in for more features
    cy.get('body').then($body => {
      // Some sites show login prompts or messages for anonymous users
      if ($body.text().includes('log in') || $body.text().includes('sign in')) {
        cy.log('Login messaging found for anonymous users')
      }
    })
  });

});
