describe("Resource Group — listing page", () => {

  it("shows resource groups on the /rp-documentation listing", () => {
    cy.visit("/rp-documentation");
    cy.get(".view-rp-documentation-index .views-row").should("have.length.greaterThan", 0);
  });

  it("shows resource groups alongside individual resources", () => {
    cy.visit("/rp-documentation");
    cy.contains("Test Resource Group");
  });

  it("links resource groups to their detail page", () => {
    cy.visit("/rp-documentation");
    cy.contains("a", "Test Resource Group")
      .should("have.attr", "href")
      .and("include", "/rp-documentation/");
  });

  it("shows inline resources table for resource groups", () => {
    cy.visit("/rp-documentation");
    cy.get("#group-test-resource-group .rp-resource-group-list").within(() => {
      cy.get("table thead").within(() => {
        cy.contains("th", "Resource");
        cy.contains("th", "Description");
      });
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
      cy.get("table tbody").contains("Test Resource Alpha");
    });
  });

  it("inline resource links point to individual RP doc pages", () => {
    cy.visit("/rp-documentation");
    cy.get(".rp-resource-group-list table tbody")
      .contains("a", "Test Resource Alpha")
      .should("have.attr", "href")
      .and("include", "/rp-documentation/test-resource-alpha");
  });

  it("resource group rows have anchor IDs", () => {
    cy.visit("/rp-documentation");
    cy.get("#group-test-resource-group").should("exist");
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

});

describe("Resource Group — ARA banner on listing page", () => {

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows ARA banner on targeted group with ara_context and ara_group params", () => {
    cy.visit("/rp-documentation?ara_context=Recommended+for+Python,+Earth+Sciences&ara_group=test-resource-group");
    cy.get("#group-test-resource-group .ara-group-banner").should("be.visible");
    cy.get("#group-test-resource-group .ara-banner-text").should("contain", "Python");
  });

  it("highlights the targeted group row", () => {
    cy.visit("/rp-documentation?ara_context=Recommended+for+Python&ara_group=test-resource-group");
    cy.get("#group-test-resource-group").should("have.class", "ring-2");
  });

  it("passes ara_context through to resource links", () => {
    cy.visit("/rp-documentation?ara_context=Recommended+for+Python&ara_group=test-resource-group");
    cy.get("#group-test-resource-group .rp-resource-link").first()
      .should("have.attr", "href")
      .and("include", "ara_context=");
  });

  it("persists banner on page reload via localStorage", () => {
    cy.visit("/rp-documentation?ara_context=Recommended+for+Python&ara_group=test-resource-group");
    cy.get("#group-test-resource-group .ara-group-banner").should("be.visible");

    cy.visit("/rp-documentation");
    cy.get("#group-test-resource-group .ara-group-banner").should("be.visible");
    cy.get("#group-test-resource-group .ara-banner-text").should("contain", "Python");
  });

  it("dismiss button clears banner for that group only", () => {
    cy.visit("/rp-documentation?ara_context=Recommended+for+Python&ara_group=test-resource-group");
    cy.get("#group-test-resource-group .ara-group-banner").should("be.visible");

    cy.get("#group-test-resource-group .ara-dismiss").click();
    cy.get("#group-test-resource-group .ara-group-banner").should("not.be.visible");
    cy.get("#group-test-resource-group").should("not.have.class", "ring-2");

    // Should not reappear on reload
    cy.visit("/rp-documentation");
    cy.get("#group-test-resource-group .ara-group-banner").should("not.be.visible");
  });

  it("no banner without ara_context param or localStorage", () => {
    cy.visit("/rp-documentation");
    cy.get(".ara-group-banner").should("not.be.visible");
  });

  it("supports multiple groups with shared context via comma-separated ara_group", () => {
    // Only one test group exists in fixtures, but verify the param is accepted
    cy.visit("/rp-documentation?ara_context=Recommended+for+Python&ara_group=test-resource-group,nonexistent-group");
    cy.get("#group-test-resource-group .ara-group-banner").should("be.visible");
  });

  it("supports ara_recs format for multiple groups with different contexts", () => {
    cy.visit("/rp-documentation?ara_recs=test-resource-group:Recommended+for+Python");
    cy.get("#group-test-resource-group .ara-group-banner").should("be.visible");
    cy.get("#group-test-resource-group .ara-banner-text").should("contain", "Python");
  });

});

describe("Resource Group — ARA banner on detail page", () => {

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows ARA banner when arriving with ara_context param", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python,+Earth+Sciences");
    cy.get("#ara-recommendation-banner").should("be.visible");
    cy.get("#ara-recommendation-text").should("contain", "Python");
  });

  it("passes ara_context through to resource links on detail page", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python");
    cy.get(".rp-resource-link").first()
      .should("have.attr", "href")
      .and("include", "ara_context=");
  });

  it("persists banner on detail page reload via localStorage", () => {
    cy.visit("/rp-documentation/test-resource-group?ara_context=Recommended+for+Python");
    cy.get("#ara-recommendation-banner").should("be.visible");

    cy.visit("/rp-documentation/test-resource-group");
    cy.get("#ara-recommendation-banner").should("be.visible");
    cy.get("#ara-recommendation-text").should("contain", "Python");
  });

  it("dismiss button clears banner and localStorage on detail page", () => {
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

describe("Resource Group — admin action buttons", () => {

  it("anonymous users do not see admin buttons", () => {
    cy.visit("/rp-documentation");
    cy.get(".rp-admin-actions").should("not.exist");
  });

  it("rp_documentation_manager sees Add Resource Group and Manage Resources buttons", () => {
    cy.exec('ddev drush user:role:add rp_documentation_manager "authenticated_test_user"', { failOnNonZeroExit: false });
    cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit("/rp-documentation");
    cy.get(".rp-admin-actions").should("exist");
    cy.get(".rp-admin-actions").contains("a", "Add Resource Group")
      .should("have.attr", "href", "/node/add/resource_group");
    cy.get(".rp-admin-actions").contains("a", "Manage Resources")
      .should("have.attr", "href", "/rp-resources/manage");
    cy.exec('ddev drush user:role:remove rp_documentation_manager "authenticated_test_user"', { failOnNonZeroExit: false });
  });

});

describe("Resource Group — field_rp_listing filter", () => {

  it("resources with field_rp_listing unchecked do not appear as standalone rows", () => {
    cy.visit("/rp-documentation");
    // Test Resource Beta has field_rp_listing unchecked — it should not appear
    // as its own row in the listing, but may appear inside a group's inline table.
    cy.get(".view-rp-documentation-index > .view-content > .views-row").each(($row) => {
      // Check the row's direct title (h3), not links inside inline tables
      cy.wrap($row).find("h3").should("not.contain", "Test Resource Beta");
    });
  });

});
