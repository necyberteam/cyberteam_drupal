/*  
    This test is specifically focused on the Announcements page tested for an unauthenticated user.
    This test checks for major functions like: 
    Filter Functionality,
    Headers,
    Testing created announcement

        
*/
describe("Unauthenticated user tests the Announcements Page", () => {
  it("Should test the Announcements page for unauthenticated user", () => {
    cy.visit("/announcements");

    // Look for Ask.CI table
    cy.get(".page-title").contains("Announcements");

    //Filter Section on announcements
    cy.get("#edit-field-affiliation-value--2").select("Community"); //Affiliation field
    cy.get("#edit-tid--2").select("login"); //Tag field
    cy.get("#edit-submit-access-news--2").click(); //Filter button

    //Created announcement through cypress
    cy.contains("http://example-0.com").click();
    cy.contains("login");
    cy.contains("Affiliation");
    cy.contains("Community");

    //Testing another announcement
    cy.visit("/announcements");
    cy.get(":nth-child(11) > .views-field-title")
      .contains("Gateways 2023 Call for Participation")
      .should("have.attr", "href", "/node/444")
      .click();
    cy.get(".page-title > .field").contains(
      "Gateways 2023 Call for Participation"
    );
    cy.get(".clearfix > :nth-child(3)").contains(
      "https://sciencegateways.org/gateways2023"
    );
  });
});
