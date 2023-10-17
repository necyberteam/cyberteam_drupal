/*  
    This test is specifically focused on the XDMoD page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title, 
    Testing accordion function,
    and verifying images and links load in  
*/

describe("Unauthenticated user tests the XDMoD Page", () => {
  it("Should test XDMoD page for unauthenticated user", () => {
    cy.visit("/xdmod");
    cy.contains("Analyze and improve your allocation usage").should(
      "be.visible"
    );
    cy.get('img[alt="XDMoD logo"]');
    cy.contains("Optimize Job Efficiency");
    cy.contains("View information about active and expired allocations.");
    cy.contains("Monitor allocation usage");
    cy.contains("View information about active and expired allocations.");
    cy.contains("View historical usage");
    cy.contains("View both personal usage and that of aggregated users").should(
      "be.visible"
    );
    cy.contains("Using XDMoD");
    cy.contains("What do I need to do to start using XDMoD?").click();
    cy.contains("Anyone with an ACCESS Identity can login to XDMoD. ").should(
      "be.visible"
    );
    cy.contains(
      "How can I find information about my ACCESS allocation usage?"
    ).click();
    cy.contains(
      "Just log on to XDMoD and click on the “Allocations” tab. It will display information about your allocations."
    );
    cy.contains(
      "How can I use XDMoD to improve my job efficiency and allocation usage efficiency?"
    ).click();
    cy.contains(
      "Many jobs do not use all of the resources asked for so they effectively use the allocation inefficiently. "
    );
    cy.contains("How can I view historical usage in XDMoD?").click();
    cy.contains(
      "You can view your own historical usage or the historical aggregated usage by logging in to XDMoD"
    );
    cy.contains("XDMoD Support");
    cy.contains("Launch XDMoD").click();
    cy.origin("https://xdmod.access-ci.org/", () => {
      cy.url().should("eq", "https://xdmod.access-ci.org/");
    });
    cy.visit("/xdmod");
    cy.contains("DOCUMENTATION");
    cy.visit("/xdmod");
    cy.contains("CONTACT US").click();
  });
});
