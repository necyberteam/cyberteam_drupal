describe("Unauthenticated user tests the XDMoD Page", () => {
  it("Should test XDMoD page for unauthenticated user", () => {
    // Given I am not logged in
    // Cypress does not have a specific command for this step as it depends on your application's authentication mechanism.

    cy.visit("/xdmod");

    cy.contains("Analyze and improve your allocation usage").should(
      "be.visible"
    );

    cy.get('img[alt="XDMoD logo"]').should("be.visible");

    cy.contains("Optimize Job Efficiency").should("be.visible");

    cy.contains(
      "View information about active and expired allocations."
    ).should("be.visible");

    cy.contains("Monitor allocation usage").should("be.visible");

    cy.contains(
      "View information about active and expired allocations."
    ).should("be.visible");

    cy.contains("View historical usage").should("be.visible");

    cy.contains("View both personal usage and that of aggregated users").should(
      "be.visible"
    );

    cy.contains("Using XDMoD").should("be.visible");

    cy.contains("What do I need to do to start using XDMoD?").click();

    cy.contains("Anyone with an ACCESS Identity can login to XDMoD. ").should(
      "be.visible"
    );

    cy.contains(
      "How can I find information about my ACCESS allocation usage?"
    ).click();

    cy.contains(
      "Just log on to XDMoD and click on the “Allocations” tab. It will display information about your allocations."
    ).should("be.visible");

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

    cy.contains("XDMoD Support").should("be.visible");

    cy.contains("Launch XDMoD").click();

    cy.origin("https://xdmod.access-ci.org/", () => {
      cy.url().should("eq", "https://xdmod.access-ci.org/");
    });

    cy.visit("/xdmod");

    cy.contains("DOCUMENTATION").should("be.visible");

    cy.visit("/xdmod");

    cy.contains("CONTACT US").click();
  });
});
