/*
    This test is focused on the MATCH Engagement form tested for an authenticated user.

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

describe("Authenticated user tests the MATCH Engagement Form", () => {
  it("Should test MATCH Engagement Form for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/node/add/match_engagement?type=plus");

    //Title Field
    cy.get("#edit-title-0-value").type("Title of a Test Engagement");

    //Institution Field
    cy.get("#edit-field-institution-0-value").type("Example University");

    //Description field
    cy.get('.field--name-body .ck-content').then(el => {
      const editor = el[0].ckeditorInstance
      editor.setData('Typing some stuff')
    })

    // Tags field
    cy.get('.tags summary').click()
    // tid 733 is the tag "ACCESS-account"
    cy.get('.tags-select[data-tid=733]').click()

    //Preffered Semester Field
    cy.get('[name="field_preferred_semester"]').select("Summer");

    // Send for Review
    cy.get('#edit-submit').click();
  });
});
