/*
    This test is specifically focused on the Video Learning Center Page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title,
    CTA Functionality
    */

describe("Unauthenticated user tests the Video Learning Center Page", () => {
  beforeEach(() => {
    // Block YouTube embeds to prevent test hanging on third-party content
    cy.intercept('**/youtube.com/**', { statusCode: 200, body: '' });
    cy.intercept('**/youtube-nocookie.com/**', { statusCode: 200, body: '' });
    cy.intercept('**/ytimg.com/**', { statusCode: 200, body: '' });
  });

  it("Should test Video Learning Center Page for unauthenticated user", () => {
    // login user with the "unauthenticated" role
    cy.visit("/video-learning-center");

    //Page Title
    cy.get(".page-title").contains("ACCESS Support Video Learning Center");

    //Call to action function
    cy.verifyCallToActionBlock(
      "/video-learning-center",
      "ACCESS CI YouTube Channel",
      "https://www.youtube.com/c/ACCESSforCI"
    );
  });
});
