/*  
    This test is specifically focused on the Skills Page tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Top Level Tag text,
    Adding a Tag Functionality 


 
    */

describe("Authenticated user tests the Add Skills without adding an Affinity Group", () => {
  it("Should test Add Interests Form for authenticated user", () => {
    // login user with the "authenticated" role

    cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit("/community-persona/add-skill");

    //Page Title and Paragraph
    cy.contains("Add Expertise");
    cy.contains(
      "If you feel comfortable helping others on a topic and sharing valuable experience"
    );

    //Adding Tag and removing Tag
    cy.get(
      ":nth-child(1) > :nth-child(2) > :nth-child(1) > .view-display-id-page_2 > .view-content > .add-skill-list > ul > :nth-child(1) > :nth-child(1) > span > .d-inline-flex > .d-none > .flag > .use-ajax"
    )
      .contains("ACCESS RPs")
      .click();
    cy.contains("Remove");
  });
});
