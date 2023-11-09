/*
    This test is specifically focused on the Events page tested for an unauthenticated user.
    This test checks for major functions like:
    Filter Functionality,
    Headers,
    Testing created event

    Test breadcrumbs

*/
describe("Unauthenticated user tests the Events Page", () => {
  it("Should test the EVents page for unauthenticated user", () => {
    cy.visit("/events");

    //Page title and column headers
    cy.get(".page-title").contains("Events & Trainings");
    cy.get("#view-title-2-table-column").contains("Title");
    cy.get("#view-date-value-1-table-column").contains("Event Date");
    cy.get("#view-body-format-table-column").contains("Description");

    //Filter feature
    cy.get("#edit-field-affiliation-value--2").select("Community"); //Affiliation field
    cy.get("#edit-field-event-type-value--2").select("Training"); //Event Type
    cy.get("#edit-tid--2").select("login"); //Tag field
    cy.get("#edit-field-skill-level-value--2").select("Advanced"); //Skill Level
    cy.get("#edit-submit-recurring-events-event-instances--2").click(); //Submit button

    //Testing Cypress Created Event
    //Event Title
    cy.get("tbody > tr > .views-field-title-2")
      .contains("example-event")
      .click();
    cy.get(".page-title > .field").contains("example-event");

    //Event Date
    cy.get(".md--col-span-3").contains("Event Date");
    cy.contains("12/12/26");

    //Event Location
    cy.get(".md--col-span-3").contains("Location");
    cy.get(".md--col-span-3").contains("Zoom");

    //Event Tags
    cy.get(".md--col-span-3").contains("Tags");
    cy.get(".md--col-span-3").contains("login");

    //Event Contact
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Contact"
    );
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Pecan Pie"
    );

    //Registration Button Not sure how to correctly reference the btn
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Registration"
    );
    // cy.get("#block-mainpagecontent > .grid > :nth-child(2)")
    //   .contains("REGISTER HERE")
    //   .should("have.attr", "href")
    //   .and(
    //     "contain",
    //     "https://discourse.openondemand.org/t/open-ondemand-tips-and-tricks-calls/1684"
    //   );

    //Event Skill Level
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Skill Level"
    );
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Advanced"
    );

    //Event Type
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Event Type"
    );
    cy.get("#block-mainpagecontent > .grid > :nth-child(2)").contains(
      "Training"
    );
  });
});
