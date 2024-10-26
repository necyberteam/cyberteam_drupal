/*
    This test is specifically focused on the CCEP page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    Header text,
    and a segment of body paragraph


*/

describe("Unauthenticated user tests the CCEP Details Page", () => {
  it("Should test CCEP Details page for unauthenticated user", () => {
    cy.visit("/ccep-details");

    //Verifying page title and paragraph
    cy.get(".page-title > .field").contains("CCEP Details");
    cy.get("h2 > strong").contains("Important Fine Print:");
    cy.get(".block-field-blocknodepagebody > .clearfix").contains(
      "All CSSN members (students, faculty, staff, or CI professionals) seeking CCEP rewards need to be affiliated"
    );
    //Verifying Join CCEP Button
    cy.get(".btn")
      .contains("APPLY TO CCEP")
      .should("have.attr", "href")
      .and("contain", "https://forms.gle/xNkn6W89Q5b7F45z8");
  });
});
