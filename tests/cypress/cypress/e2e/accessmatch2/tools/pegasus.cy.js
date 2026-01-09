/*
    This test is specifically focused on the Pegasus page tested for an unauthenticated user.
    This test checks for major functions like:
    Accordion Functionality,
    Headers,

*/
describe("Unauthenticated user tests the Pegaus Page", () => {
  it("Should test the Pegasus page for unauthenticated user", () => {
    cy.visit("/tools/pegasus");

    //Page intro paragraph
    cy.get("#about > .prose").contains(
      "Construct, run, and debug workflows from a Jupyter Notebook."
    );

    //Accordion Functionality
    cy.get("details summary")
      .contains("Why use workflows")
      .click();
    cy.get("details[open] > .bg-white").contains(
      "Scientific Workflow Management Systems (WMS) such as Pegasus are vital tools for scientists and researchers in a wide range of fields."
    );
    cy.get("details[open] > .bg-white").contains(
      "Some reasons you should consider using a system like Pegasus WMS"
    );

    // Workflow section
    cy.get("details[open] .grid > :nth-child(1) h4").contains(
      "REPRODUCIBILITY"
    );
    cy.get("details[open] .grid > :nth-child(2) h4").contains(
      "AUTOMATION"
    );
    cy.get("details[open] .grid > :nth-child(3) h4").contains(
      "SCALABILITY"
    );
  });
});
