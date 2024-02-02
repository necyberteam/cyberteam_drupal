/*
    This test is specifically focused on the CCEP page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    Testing accordion function,
*/

describe("Unauthenticated user tests the CCEP Page", () => {
  it("Should test CCEP page for unauthenticated user", () => {
    cy.visit("/ccep");

    // Page Intro paragraph
    cy.get("#about").contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards to ANYONE"
    );
    cy.get("#about > :nth-child(2)").contains(
      "Submissions are reviewed once a month"
    );

    // Accordion Section
    cy.get("#about > h2").contains("$3,000");
    cy.get("section:nth-child(2) > :nth-child(2) > .bg-light-teal")
      .contains("Intro to ACCESS lecture")
      .click();
    cy.get('[open=""] > .bg-white').contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for Basic, Intermediate, or Advanced User."
    );

    // Apply To CCEP Button
    cy.get(".btn")
      .contains("Apply to CCEP")
      .should("have.attr", "href")
      .and("contain", "https://forms.gle/u4d4kCtsYNQgzxjq5");

    // Important Fine Print Section
    cy.visit("/ccep");
    cy.get("#fine-print").contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards to ANYONE for community engagement, feedback forums,"
    );

    // Testing See All Details click function and Intro text of /ccep/ccep-details
    cy.get(".container > :nth-child(3) > a")
      .contains("See all the details")
      .click();
    cy.get(".field--name-body ul > li:first-of-type").contains(
      "All CSSN members (students, faculty, staff"
    );
  });
});
