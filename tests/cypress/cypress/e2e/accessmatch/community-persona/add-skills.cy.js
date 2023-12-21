/*
    This test is specifically focused on the Skills Page tested for an authenticated user.
    This test checks for major functions like:
    Page Title,
    Top Level Tag text,
    Adding a Tag Functionality



    */

describe("Authenticated user tests the Add Skills without adding an Affinity Group", () => {
  it("Should test Add Skills Form for authenticated user", () => {
    // login user with the "authenticated" role

    cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit("/community-persona/add-skill");

    //Adding Tag
    cy.contains("access-account").click();
  });
});
