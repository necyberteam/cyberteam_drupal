/*  
    This test is specifically focused on the Interests Page tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Top Level Tag text,
    Adding a Tag Functionality 


  
    */

describe("Authenticated user tests the Add Interests without adding an Affinity Group", () => {
  it("Should test Add Interests Form for authenticated user", () => {
    // login user with the "authenticated" role

    cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit("/community-persona/add-interest");

    //Adding Tag and removing Tag
    cy.contains("access-acount").click();
    cy.contains("Remove");
  });
});
