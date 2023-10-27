/*  
    This test is specifically focused on the Announcements form tested for an authenticated user.
    This test checks for major functions like:
    Page Title, 
    Header text,
    Form Functionality 
    

    The announcement is not finished a body needs to be added and Pecan Pie needs to become a coordinator
//cy.get("#edit-field-affinity-group-node-0-target-id").type(
    //"ACCESS Support (327)"
    //);

    */

describe("Authenticated user tests the Announcement Form without adding an Affinity Group", () => {
  it("Should test Announcements Form for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/node/add/access_news");
    cy.contains("Create ACCESS Announcements");
    cy.get("#edit-title-0-value").type("http://example-0.com");
    cy.contains("Featured Image");
    cy.get("#edit-field-tags-0-target-id").type("login (682)");
    cy.contains("Published Date");
    cy.get("#edit-field-affiliation").select("Community");
    cy.get('[name="moderation_state[0][state]"]').select("Ready for Review");
    cy.get("#edit-submit").click();
    cy.contains("Thank you for submitting your news");
    cy.contains("ACCESS Announcements http://example-0.com has been created.");
  });
});
