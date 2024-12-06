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
    cy.get(":nth-child(2) > .bg-light-teal")
      .contains("Why use workflows")
      .click();
    cy.get('[open=""] > .bg-white > :nth-child(1) > :nth-child(1)').contains(
      "Scientific Workflow Management Systems (WMS) such as Pegasus are vital tools for scientists and researchers in a wide range of fields."
    );
    cy.get('[open=""] > .bg-white > :nth-child(1) > :nth-child(1)').contains(
      "Some reasons you should consider using a system like Pegasus WMS"
    );

    //Workflow section
    cy.get(":nth-child(1) > .grid > :nth-child(2) > .mb-0").contains(
      "REPRODUCIBILITY"
    );
    cy.get(":nth-child(1) > .grid > :nth-child(4) > .mb-0").contains(
      "AUTOMATION"
    );
    cy.get(":nth-child(1) > .grid > :nth-child(6) > .mb-0").contains(
      "SCALABILITY"
    );
  });
});
