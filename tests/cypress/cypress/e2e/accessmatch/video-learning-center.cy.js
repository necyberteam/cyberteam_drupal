/*
    This test is specifically focused on the Video Learning Center Page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    CTA Functionality
    */

describe("Unauthenticated user tests the Video Learning Center Page", () => {
  it("Should test Video Learning Center Page for unauthenticated user", () => {
    // login user with the "unauthenticated" role
    cy.visit("/video-learning-center");

    //Page Title
    cy.contains("ACCESS Support Video Learning Center");

    //Call to action function
    cy.verifyCallToActionBlock(
      "/video-learning-center",
      "ACCESS CI YouTube Channel",
      "https://www.youtube.com/c/ACCESSforCI"
    );
  });
});
