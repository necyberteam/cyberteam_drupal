describe("test people page Card view w/ filters", () => {

  it("Authenticated user tests the people page in Card View and filter", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/people');
    cy.contains('People');
    cy.contains('Programs');
    cy.contains('Skills')
    cy.contains('Organization')

    cy.get('#edit-search-api-fulltext--3').type('testing123')
    cy.wait(700);
    cy.contains('No matches found')

    cy.get('#edit-search-api-fulltext--3').clear()
    cy.get('#edit-search-api-fulltext--3').type('julie')
    cy.wait(700);
    cy.contains('Julie Ma')

    cy.get('#edit-search-api-fulltext--3').clear()
    cy.get('#program-308').click();
    cy.wait(700);
    cy.contains('Programs Northeast')
  });


});
