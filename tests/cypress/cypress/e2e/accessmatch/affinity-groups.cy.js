/*  
    This test is specifically focused on the Affinity Groups page tested for an unauthenticated user.
    This test checks for major functions like: 
    Headers,
    Text,
    
        Switch testing to Individual affinity group testing

*/
describe("Unauthenticated user tests the Affinity Groups", () => {
  it("Should test the Affinity Groups for unauthenticated user", () => {
    cy.visit("/affinity_groups");
    cy.contains("Affinity Groups");
    cy.contains(
      "Join groups of people within ACCESS that share a common interest."
    );
    cy.get(".bg-light-teal > .btn");
    // SHould all headers be tested?
    cy.contains("Logo");
    cy.contains("Affinity Group");
    cy.contains("Description");
    cy.contains("Join");
    //Should we test an affinity group?
    cy.contains("ACCESS Facilitators");
    cy.contains("People who use or support people");
    cy.contains("research-facilitation");
    //buttons?
  });
});
