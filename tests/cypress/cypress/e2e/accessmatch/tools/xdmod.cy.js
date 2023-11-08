/*  
    This test is specifically focused on the XDMoD page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title, 
    Testing accordion function, 
*/

describe("Unauthenticated user tests the XDMoD Page", () => {
  it("Should test XDMoD page for unauthenticated user", () => {
    cy.visit("/xdmod");

    //Page Title and Intro paragraph
    cy.get(".prose > .text-white").contains(
      "Analyze and improve your allocation usage"
    );
    cy.contains("View information about allocations, usage data and usage");

    //Checkpoint section
    cy.get("#about > .grid > :nth-child(1)").contains(
      "Optimize job efficiency"
    );
    cy.get("#about > .grid > :nth-child(1)").contains(
      "View information about active and expired allocations."
    );

    //Accordion section and function
    cy.get("#using-xdmod > .colored-square").contains("Using XDMoD");
    cy.get(":nth-child(3) > .bg-light-teal")
      .contains("What do I need to do to start using XDMoD?")
      .click();
    cy.get('[open=""] > .bg-white').contains(
      "Anyone with an ACCESS Identity can login to XDMoD. "
    );

    //XDMOD Support Section The below five lines do not work for now
    // cy.get(".container > .colored-square").contains("XDMoD Support");
    // cy.get('.grid > [href="https://xdmod.access-ci.org"]')
    //   .contains("Launch XDMoD")
    //   .should("have.attr", "href")
    //   .and("contain", "https://xdmod.access-ci.org/");
  });
});
