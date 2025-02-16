describe("test people page w/ filters", () => {

  it("Authenticated user tests the people page and filter", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/people');
    cy.contains('People');
    cy.contains('Programs');
    cy.contains('Skills')
    cy.contains('Organization')

    cy.get('#edit-search-api-fulltext--3').type('testing123')
    cy.wait(1000)
    cy.contains('No matches found')

    cy.get('#edit-search-api-fulltext--3').clear()
    cy.wait(1000)
    cy.get('#edit-search-api-fulltext--3').type('julie')
    cy.wait(1000)
    cy.contains('Julie Ma')

    cy.get('#edit-search-api-fulltext--3').clear()
    cy.wait(1000)

    cy.get('#program-308').click();
    cy.contains('Programs Northeast')
    cy.get('#program-reset-all').click();

    cy.get('#block-nect-organizationcyberteampeople > .mb-4 > .facets-soft-limit-link').click();
    cy.get('#organization-cyberteam-people-1931').click();
    cy.contains('Harvard University')
    cy.get('#organization-cyberteam-people-reset-all').click();

    cy.get('#block-nect-userskillscyberteampeople > .mb-4 > .facets-soft-limit-link').click();
    cy.get('#user-skills-cyberteam-people-llm').click();
    cy.contains('llm')
    cy.get('#user-skills-cyberteam-people-bash').click();

  });


});
