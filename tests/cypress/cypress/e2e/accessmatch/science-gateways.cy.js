/*  
    This test is specifically focused on the Science Gateways page tested for an unauthenticated user.
    This test checks for major functions like: 
    Accordion Functionality,
    Headers,
        
*/
describe("Unauthenticated user tests the Science Gateways Page", () => {
  it("Should test the Science Gateways page for unauthenticated user", () => {
    cy.visit("/tools/science-gateways");
    //Introduction Paragraph
    cy.get("#about > .prose").contains(
      "A science portal or science gateway is a community-developed set of tools, applications, and data integrated through a web-based portal or a suite of applications."
    );
    //Accordion Functionality
    cy.get(":nth-child(5) > .bg-light-teal")
      .contains("How do I use a Gateway?")
      .click();
    cy.get('[open=""] > .bg-white').contains(
      "You can use most science gateways like a typical website"
    );
  });
});
