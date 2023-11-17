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

    //Call to action function
    cy.verifyCallToActionBlock(
      "/community/overview",
      "Join the CSSN",
      "/user/login?destination=/cssn%23join-cssn"
    );

    //Popular Tags tested?
  });
});
