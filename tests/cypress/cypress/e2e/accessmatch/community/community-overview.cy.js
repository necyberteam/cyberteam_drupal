/*
    This test is specifically focused on the Community Overview Page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    CTA Functionality
    Popular Tags
    */

describe("Unauthenticated user tests the Community Overview Page", () => {
  it("Should test Community Overview Page for unauthenticated user", () => {
    // login user with the "unauthenticated" role
    cy.visit("/community/overview");

    //Page Title
    cy.get(".page-title").contains("Community");

    //Call to action function
    cy.verifyCallToActionBlock(
      "/community/overview",
      "Explore the Directory",
      "/community/cssn/directory"
    );

    //Popular Tags tested?
  });
});
