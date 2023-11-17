/*
    This test is specifically focused on the Match Overview Page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    CTA Functionality
    Match Enagagements section
    */

describe("Unauthenticated user tests the Match Overview Page", () => {
  it("Should test Match Overview Page for unauthenticated user", () => {
    // login user with the "unauthenticated" role
    cy.visit("/match/overview");

    //Page Title
    cy.get(".page-title > .field").contains("Match Services Overview");

    //Call to action function
    cy.verifyCallToActionBlock(
      "/match/overview",
      "Request an engagement",
      "/node/add/match_engagement?type=plus"
    );

    //Match Engagements Header
    cy.get(".m-0").contains("MATCH Engagements");

    //Match Engagements Btn
    cy.get(".btn")
      .should("exist")
      .contains("All Engagements")
      .should("have.attr", "href", "/match/engagements");

    //Individual Match Engagement
    cy.get(":nth-child(2) > .card > .card-body").contains(
      "GPU-accelerated ice sheet flow modeling"
    );
    cy.get(":nth-child(2) > .card > .card-body").contains(
      "University of North Dakota"
    );
    cy.get(":nth-child(2) > .card > .card-body").contains(
      "Status: In Progress"
    );
  });
});
