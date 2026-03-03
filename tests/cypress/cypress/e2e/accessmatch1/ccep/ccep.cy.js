/*
    This test is specifically focused on the CCEP page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    Testing accordion function,
*/

describe.skip("Unauthenticated user tests the CCEP Page - page unpublished", () => {
  it("Should test CCEP page for unauthenticated user", () => {
    cy.visit("/ccep");

    // Page Intro paragraph
    cy.get("#about").contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards"
    );
    cy.get("#about").contains(
      "Submissions are reviewed once a month"
    );

    // Accordion Section
    cy.get("h2").contains("$3,000");
    cy.get("section.ccep-accordions")
      .contains("Intro to ACCESS lecture for domain")
      .click();
    cy.get('[open=""] > .bg-white').contains(
      "Prepare an Intro to ACCESS lecture"
    );

    // Apply To CCEP Button
    // Applications not currently being accepted
    //cy.get(".btn")
    //  .contains("Apply to CCEP")
    //  .should("have.attr", "href")
    //  .and("contain", "https://forms.gle/bHYCiaaNnzYVZCt77");

    // Important Fine Print Section
    cy.visit("/ccep");
    cy.get("#fine-print").contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards for community engagement, feedback forums,"
    );

    // Testing See All Details click function and Intro text of /ccep/ccep-details
    cy.get("#fine-print a")
      .contains("See all the details")
      .click();
    cy.get(".page-title > span").contains(
      "CCEP Details"
    );
  });
});
