describe("ARA Recommendation Banner", () => {

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows banner when arriving with ara_context param", () => {
    cy.visit("/documentation/resources/test-resource-alpha?ara_context=Recommended+for+QGIS,+Python,+Earth+Sciences");
    cy.get("#ara-recommendation-banner").should("be.visible");
    cy.contains("The ACCESS Resource Advisor recommends this resource");
    cy.get("#ara-recommendation-text").should("contain", "QGIS");
  });

  it("persists banner on page reload (localStorage)", () => {
    cy.visit("/documentation/resources/test-resource-alpha?ara_context=Recommended+for+QGIS");
    cy.get("#ara-recommendation-banner").should("be.visible");

    // Revisit without param — banner should still show from localStorage.
    cy.visit("/documentation/resources/test-resource-alpha");
    cy.get("#ara-recommendation-banner").should("be.visible");
    cy.get("#ara-recommendation-text").should("contain", "QGIS");
  });

  it("dismiss button clears banner and localStorage", () => {
    cy.visit("/documentation/resources/test-resource-alpha?ara_context=Recommended+for+QGIS");
    cy.get("#ara-recommendation-banner").should("be.visible");

    cy.get("#ara-dismiss").click();
    cy.get("#ara-recommendation-banner").should("not.be.visible");

    // Reload — banner should stay dismissed.
    cy.visit("/documentation/resources/test-resource-alpha");
    cy.get("#ara-recommendation-banner").should("not.be.visible");
  });

  it("no banner without ara_context param or localStorage", () => {
    cy.visit("/documentation/resources/test-resource-alpha");
    cy.get("#ara-recommendation-banner").should("not.be.visible");
  });

});
