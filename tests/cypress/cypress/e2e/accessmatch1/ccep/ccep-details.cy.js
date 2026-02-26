/*
    This test is specifically focused on the CCEP page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    Header text,
    and a segment of body paragraph


*/

describe.skip("Unauthenticated user tests the CCEP Details Page - page unpublished", () => {
  it("Should test CCEP Details page for unauthenticated user", () => {
    cy.visit("/ccep-details");

    //Verifying page title and paragraph
    cy.get(".page-title > .field").contains("CCEP Details");
    cy.get("h2").contains("Important Fine Print:");
    cy.get(".layout__region--content .prose").contains(
      "Must be a US citizen or legal permanent resident"
    );
    //Verifying Join CCEP Button
    cy.get(".btn")
      .contains("APPLY TO CCEP")
      .should("have.attr", "href")
      .and("contain", "https://forms.gle/bHYCiaaNnzYVZCt77");
  });
});
