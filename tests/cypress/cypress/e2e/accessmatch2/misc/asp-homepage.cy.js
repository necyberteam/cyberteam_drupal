/*
    This test is specifically focused on the ASP Homepage tested for an unauthenticated user.
    This test checks for major functions like:

    Announcements and Events block,
    Call to actions,
    Search Access

*/
describe("Unauthenticated user tests the ASP Homepage", () => {
  it("Should test the ASP Homepage for unauthenticated user", () => {
    cy.visit("/");

    //Announcements block section
    cy.get(".block-views-blockaccess-news-latest-news-block").contains(
      "Announcements"
    );
    cy.get(".block-views-blockaccess-news-latest-news-block").contains(
      "See all"
    );

    //Events block section
    cy.get(
      ".block-views-blockrecurring-events-event-instances-latest-events-block"
    ).contains("Training and Events");
    cy.get(
      ".block-views-blockrecurring-events-event-instances-latest-events-block"
    ).contains("See all");

    //Search Access block section and button destination
    cy.get(":nth-child(1) > .mt-0").contains("Search ACCESS");

    cy.get(".clearfix > .grid > :nth-child(1) > .btn")
      .contains("Search")
      .should("have.attr", "href", "/find");

    //Call to action function
    cy.verifyCallToActionBlock(
      "/",
      "Explore the SDS",
      "https://sds.access-ci.org/"
    );
  });
});
