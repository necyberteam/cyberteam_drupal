/*  
    This test is focused on the MATCH+ Engagement form tested for an authenticated user.

    A MATCH Engagement can be submitted by any authenticated user.
    Required fields for creating a MATCH Engagement are:
    - Title, Description, Institution, Preferred Semester, and Tags.
    The Engagement can be saved as a draft or sent for review.

    Users with the MATCH PM role receive an email notification when a MATCH Engagement is submitted.
    When a MATCH PM saves the engagement as "Received", the user who submitted 
    the engagement receives an email notification and additional fields are displayed.
    - todo: add tests for additional fields
    
    The author adds additional information and saves the engagement as "In Review".

    The MATCH SC receives an email notification when the engagement is saved as "In Review".
    The MATCH SC reviews the engagement and saves it as "Recruiting".
    When in "Recruiting" state, the engagement is displayed on the MATCH Engagements page
    and potential participants can flag interest in the engagement.

    Other states for the engagement include "Reviewing Applicants", "In Progress", 
    "Finishing Up", "On Hold", "Halted", and "Complete".
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
