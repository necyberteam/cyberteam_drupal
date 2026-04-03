describe("Resource Group — listing page", () => {

  it("shows resource groups on the /rp-documentation listing", () => {
    cy.visit("/rp-documentation");
    cy.get(".view-rp-documentation-index .views-row").should("have.length.greaterThan", 0);
  });

  it("shows resource groups alongside individual resources", () => {
    cy.visit("/rp-documentation");
    // The listing should contain both types — check for a known resource group
    cy.contains("Test Resource Group");
  });

  it("links resource groups to their detail page", () => {
    cy.visit("/rp-documentation");
    cy.contains("a", "Test Resource Group")
      .should("have.attr", "href")
      .and("include", "/rp-documentation/");
  });

});

describe("Resource Group — detail page", () => {

  beforeEach(() => {
    cy.visit("/rp-documentation/test-resource-group");
  });

  it("renders the page title", () => {
    cy.contains("Test Resource Group");
  });

  it("renders the group description", () => {
    cy.contains("A test resource group for CI testing");
  });

  it("renders the resources table with headers", () => {
    cy.get(".rp-resource-group-list").should("exist");
    cy.contains("h2", "Resources in this group");
    cy.get(".rp-resource-group-list table thead").within(() => {
      cy.contains("th", "Resource");
      cy.contains("th", "Description");
    });
  });

  it("lists linked resources in the table", () => {
    cy.get(".rp-resource-group-list table tbody tr").should("have.length.greaterThan", 0);
    cy.get(".rp-resource-group-list table tbody").contains("Test Resource Alpha");
  });

  it("resource links point to individual RP doc pages", () => {
    cy.get(".rp-resource-group-list table tbody")
      .contains("a", "Test Resource Alpha")
      .should("have.attr", "href")
      .and("include", "/rp-documentation/test-resource-alpha");
  });

  it("does not show an Organization column", () => {
    cy.get(".rp-resource-group-list table thead").within(() => {
      cy.contains("th", "Organization").should("not.exist");
    });
  });

  it("renders resource descriptions with HTML", () => {
    // Description should be rendered as HTML, not escaped
    cy.get(".rp-resource-group-list table tbody td").first().next()
      .find("p, a, strong, em, ul, ol").should("exist");
  });

  it("shows a read more link for each resource", () => {
    cy.get(".rp-resource-group-list table tbody tr").first().within(() => {
      cy.contains("a", "read more");
    });
  });

});

describe("Resource Group — ARA banner", () => {

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows ARA banner when arriving with ara_context param", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python,+Earth+Sciences");
    cy.get("#ara-recommendation-banner").should("be.visible");
    cy.get("#ara-recommendation-text").should("contain", "Python");
  });

  it("passes ara_context through to resource links", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python");
    cy.get(".rp-resource-link").first()
      .should("have.attr", "href")
      .and("include", "ara_context=");
  });

  it("persists banner on page reload via localStorage", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python");
    cy.get("#ara-recommendation-banner").should("be.visible");

    cy.visit("/rp-documentation/test-resource-group");
    cy.get("#ara-recommendation-banner").should("be.visible");
    cy.get("#ara-recommendation-text").should("contain", "Python");
  });

  it("dismiss button clears banner and localStorage", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python");
    cy.get("#ara-recommendation-banner").should("be.visible");

    cy.get("#ara-dismiss").click();
    cy.get("#ara-recommendation-banner").should("not.be.visible");

    cy.visit("/rp-documentation/test-resource-group");
    cy.get("#ara-recommendation-banner").should("not.be.visible");
  });

  it("no banner without ara_context param or localStorage", () => {
    cy.visit("/rp-documentation/test-resource-group");
    cy.get("#ara-recommendation-banner").should("not.be.visible");
  });

});

describe("Resource Group — field_rp_listing filter", () => {

  it("resources with field_rp_listing unchecked do not appear on listing", () => {
    cy.visit("/rp-documentation");
    // Test Resource Beta has field_rp_listing unchecked (part of a group)
    cy.contains(".view-rp-documentation-index a", "Test Resource Beta").should("not.exist");
  });

});
