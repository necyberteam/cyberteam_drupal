/*  
    This test is specifically focused on the Science Gateways page tested for an unauthenticated user.
    This test checks for major functions like: 
    Accordion Functionality,
    Headers,
    and Verifying links and images load in,
        
*/
describe("Unauthenticated user tests the Science Gateways Page", () => {
  it("Should test the Science Gateways page for unauthenticated user", () => {
    cy.visit("/tools/science-gateways");
    cy.contains(
      "A science portal or science gateway is a community-developed set of tools, applications, and data integrated through a web-based portal or a suite of applications."
    );
    cy.contains("How do I use a Gateway?").click();
    cy.contains("You can use most science gateways like a typical website");
  });
});
