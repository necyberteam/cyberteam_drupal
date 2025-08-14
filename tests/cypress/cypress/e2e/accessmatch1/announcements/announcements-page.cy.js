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

    // Look for title of the Announcements page
    cy.get(".page-title").contains("Announcements");

    // check breadcrumbs
    const crumbs = [
      ["Support", "/"],
      ["Announcements", null],
    ];
    cy.checkBreadcrumbs(crumbs);

    //Filter Section on announcements
    cy.get("#edit-tid--2").select("ai"); //Tag field
    cy.get("#edit-submit-access-news--2").click(); //Filter button

    //Created announcement through cypress
    cy.get(".view-content .views-field-title")
      .contains("Cypress-Created-Announcement")
      .click();
    cy.get(".field__item > .font-normal").contains("ai");
    cy.get(".field__label").contains("Affiliation");
    cy.get(".layout__region--second").contains(
      "Community"
    );

    //Testing another announcement
    cy.visit("/announcements");
    cy.contains("Gateways 2023 Call for Participation").click();
    cy.get(".page-title > .field").contains(
      "Gateways 2023 Call for Participation"
    );
    cy.get(".clearfix").contains("https://sciencegateways.org/gateways2023");
  });
});
