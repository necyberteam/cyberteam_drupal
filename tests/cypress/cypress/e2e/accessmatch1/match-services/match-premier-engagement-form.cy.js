/*
    This test is specifically focused on the MATCH Premier Engagement form tested for an authenticated user.
    This test checks for major functions like:
    Page Title,
    Header text,
    Form Functionality

*/

describe("Authenticated user tests the MATCH Premier Engagement Form", () => {
  it("Should test MATCH Premier Engagement Form for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");
    cy.visit("/node/add/match_engagement?type=premier");

    //Title Field
    cy.get("#edit-title-0-value").type("Title for a Test Premier Engagement");

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

    // Send for Review
    cy.get('#edit-submit').click();
  });
});
