/*  
    This test is specifically focused on the Pegasus page tested for an unauthenticated user.
    This test checks for major functions like: 
    Accordion Functionality,
    Headers,
        
*/
describe("Unauthenticated user tests the Pegaus Page", () => {
  it("Should test the Pegasus page for unauthenticated user", () => {
    cy.visit("/pegasus");
    cy.contains("Construct, run, and debug workflows from a Jupyter Notebook.");
    //Testing an accordion
    cy.contains("Why use workflows").click();
    cy.contains(
      "Scientific Workflow Management Systems (WMS) such as Pegasus are vital tools for scientists and researchers in a wide range of fields."
    );
    cy.contains(
      "Some reasons you should consider using a system like Pegasus WMS"
    );
    cy.contains("REPRODUCIBILITY");
    cy.contains("AUTOMATION");
    cy.contains("SCALABILITY");
  });
});
