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

    // Send for Review
    cy.get('#edit-submit').click();
  });

  it("Should clone a MATCH Plus Engagement node", () => {
    // Administrator has 'clone node entity' permission
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    cy.visit("/node/add/match_engagement?type=plus");

    cy.get("#edit-title-0-value").type("Engagement To Be Cloned");
    cy.get("#edit-field-institution-0-value").type("Clone University");

    cy.get('.field--name-body .ck-content').then(el => {
      const editor = el[0].ckeditorInstance
      editor.setData('Content to be cloned')
    })

    cy.get('.tags summary').click()
    cy.get('.tags-select[data-tid=733]').click()

    cy.get("#edit-field-match-office-hours-value").check();

    cy.get('#edit-submit').click();

    // Capture the node ID from the page after save
    cy.get('article[data-history-node-id]').then(($article) => {
      const nid = $article.attr('data-history-node-id');

      // Visit the entity_clone form for this node
      cy.visit(`/entity_clone/node/${nid}`);

      cy.get('h1').should('contain', 'Clone Content');

      // Submit the clone form
      cy.get('input[value="Clone"]').click();

      // Should redirect to the cloned node with a success message
      cy.get('.messages--status').should('contain', 'was cloned');

      // Cloned node should have a higher node ID than the original
      cy.get('article[data-history-node-id]').then(($cloneArticle) => {
        const cloneNid = $cloneArticle.attr('data-history-node-id');
        expect(parseInt(cloneNid)).to.be.greaterThan(parseInt(nid));
      });
    });
  });
});
