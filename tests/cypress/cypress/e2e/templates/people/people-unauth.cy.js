describe("test people page Card view w/ filters", () => {

  it("Authenticated user tests the people page in Card View and filter", () => {
    cy.visit('/people');
    cy.contains('People');
    cy.contains('Programs');
    cy.contains('Skills')
    cy.contains('Organization')

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

    cy.get('#program-308').click();
    cy.contains('Programs Northeast')
    cy.get('#program-reset-all').click();

    cy.get('#block-nect-organizationcyberteampeople .facets-soft-limit-link').click();
    cy.get('#organization-cyberteam-people-1931').click();
    cy.contains('Harvard University')
    cy.get('#organization-cyberteam-people-reset-all').click();

    cy.get('#block-nect-userskillscyberteampeople .facets-soft-limit-link').click();
    cy.get('#user-skills-cyberteam-people-llm').click();
    cy.contains('llm')
    cy.get('#user-skills-cyberteam-people-bash').click();

  });

});
