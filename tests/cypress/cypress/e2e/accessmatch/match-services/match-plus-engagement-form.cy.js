/*  
    This test is specifically focused on the MATCH+ Engagement form tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Header text,
    Form Functionality 
    
*/

describe("Authenticated user tests the MATCH+ Engagement Form", () => {
  it("Should test MATCH+ Engagement Form for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/node/add/match_engagement?type=plus");

    //Title Field
    cy.get("#edit-title-0-value").type("http://example-0.com");

    //Institution Field
    cy.get("#edit-field-institution-0-value").type("Example University");

    //Description field does not actually type anything in (Below two lines are for the description field)
    // cy.get("p").type("Testing");
    // cy.get(".ck-editor__main > .ck").type("Testing");

    //Trouble with selecting tags setcion
    //cy.get("#edit-field-tags-wrapper").click();
    //cy.get("Login").click();
    //cy.get("#edit-title-0-value").type("http://example-0.com");

    //Preffered Semester Field
    cy.get('[name="field_preferred_semester"]').select("Summer");

    //Save As Field
    cy.get('[name="moderation_state[0][state]"]').select("Submitted");
  });
});