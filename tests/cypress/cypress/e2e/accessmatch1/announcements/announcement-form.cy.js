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
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    cy.visit("/node/add/access_news");

    // Page Title
    cy.get(".page-title").contains("Create Announcement");

    // Form Title Field
    cy.get("#edit-title-0-value").type("Cypress-Created-Announcement");

    // Form Image Field
    cy.get("#ajax-wrapper > .claro-details").contains("Featured Image");

    // Tags
    cy.get("#tag-ai").click();

    // Date for Announcement
    cy.get(
      "#edit-field-published-date-wrapper > .form-datetime-wrapper"
    ).contains("Published Date");

    // Affiliation Field
    cy.get("#edit-field-affiliation").select("Community");

    // Choose where to share this field - test the new field
    cy.get("#edit-field-choose-where-to-share-this").should("exist");
    // Verify default is "on the Announcements page"
    cy.get('input[name="field_choose_where_to_share_this[on_the_announcements_page]"]').should("be.checked");
    // Select additional option - "in the ACCESS Support Bi-Weekly Digest"
    cy.get('input[name="field_choose_where_to_share_this[in_the_access_support_bi_weekly_digest]"]').check();

    // Save As Field
    cy.get('[name="moderation_state[0][state]"]').select("Published");

    // Submission and confirmation
    cy.get("#edit-submit").click();
    cy.contains(
      "Announcement Cypress-Created-Announcement has been created."
    );

    // test announcement appears on the Announcements page in My Announcements box
    cy.visit("/announcements");
    cy.get('.view-access-news').contains("My Announcements");
    cy.get('.view-access-news').contains("Cypress-Created-Announcement");

  });
});
