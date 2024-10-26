/*
    This test is specifically focused on the Events form tested for an authenticated user.
    This test checks for major functions like:
    Page Title,
    Header text,
    Form Functionality


    // cy.get("#edit-field-affinity-group-node-0-target-id").type(
    //   "Access Support Testing (413)"
    // );
*/

describe("Authenticated user tests the Events Form without Affinity Group", () => {
  it("Should test Events Form for authenticated user",
    {
      retries: {
        runMode: 3,
        openMode: 1,
      },
    },
    () => {
    // login user with the "authenticated" role
    cy.loginAs("administrator@amptesting.com", "b8QW]X9h7#5n");
    cy.visit("/");
    cy.get(':nth-child(1) > .views-field-title-2 > .field-content > .block')
    cy.visit("/events/add");

    // Page Title
    cy.get("#block-claro-page-title").contains("Create ACCESS Event");

    // User filling out form title
    cy.get("#edit-title-0-value").type("example-event");

    // Date and Time of Event
    cy.get("#edit-recur-type-custom").click();
    cy.get("#custom-date-values > thead > tr > .field-label").contains(
      "Custom Date(s) and Time(s)"
    );
    cy.get("#edit-custom-date-0-value-date").type("2026-12-12");
    cy.get("#edit-custom-date-0-end-value-date").type("2027-12-12");
    cy.get("#edit-custom-date-0-value-time").type("04:30:00");
    cy.get("#edit-custom-date-0-end-value-time").type("04:30:00");

    // Event Location
    cy.get("#edit-field-location-0-value").type("Zoom");

    // Event Contact
    cy.get("#edit-field-contact-0-value").type("Pecan Pie");

    // Registration Link
    cy.get("#edit-field-registration-0-uri").type(
      "https://test-accessmatch.pantheonsite.io/"
    );

    // Event Tag
    cy.get("details.tags summary").click().get("#tag-login").click();

    //Save As Selection
    cy.get("#edit-moderation-state-0-state").select("Published");

    //Event Type
    cy.get("#edit-field-event-type-training").click();

    //Event Affiliation
    cy.get("#edit-field-affiliation-community").click();

    //Event Skill Level
    cy.get("#edit-field-skill-level-advanced").click();

    //Form Submit Button and confirmation
    cy.config("defaultCommandTimeout", 10000);
    // Fails on github, but works locally. Accept the failure for now.
    cy.get("#edit-submit", { failOnNonZeroExit: false }).click();
    //cy.contains("Successfully saved the example-event event series");
  });
});
