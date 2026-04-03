describe("RP Resources Admin View", () => {

  const managePath = "/rp-resources/manage";

  describe("Anonymous access", () => {
    it("denies anonymous users access to the manage view", () => {
      cy.visit(managePath, { failOnStatusCode: false });
      cy.url().should("not.include", managePath);
    });
  });

  describe("kb_pm role (no longer has RP access)", () => {
    before(() => {
      cy.exec('ddev drush user:role:add kb_pm "authenticated_test_user"', { failOnNonZeroExit: false });
    });

    after(() => {
      cy.exec('ddev drush user:role:remove kb_pm "authenticated_test_user"', { failOnNonZeroExit: false });
    });

    beforeEach(() => {
      cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    });

    it("cannot access the manage view", () => {
      cy.visit(managePath, { failOnStatusCode: false });
      cy.url().should("not.include", managePath);
    });
  });

  describe("rp_documentation_manager role", () => {
    before(() => {
      cy.exec('ddev drush user:role:add rp_documentation_manager "authenticated_test_user"', { failOnNonZeroExit: false });
    });

    after(() => {
      cy.exec('ddev drush user:role:remove rp_documentation_manager "authenticated_test_user"', { failOnNonZeroExit: false });
    });

    beforeEach(() => {
      cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");
    });

    it("can access the manage view", () => {
      cy.visit(managePath);
      cy.url().should("include", managePath);
      cy.contains("RP Resources");
    });

    it("shows table with expected columns", () => {
      cy.visit(managePath);
      cy.get("table thead").within(() => {
        cy.contains("th", "Resource");
        cy.contains("th", "Organization");
        cy.contains("th", "Updated");
        cy.contains("th", "Operations");
      });
    });

    it("displays CIDER resource rows", () => {
      cy.visit(managePath);
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
    });

    it("has exposed filters for Resource and Organization", () => {
      cy.visit(managePath);
      cy.get("#edit-title").should("exist");
      cy.get("#edit-org").should("exist");
    });

    it("filters by resource name", () => {
      cy.visit(managePath);
      cy.get("#edit-title").type("Test Resource Alpha");
      cy.get("#edit-submit-rp-resources-admin").click();
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
      cy.get("table tbody").contains("Test Resource Alpha");
    });

    it("filters by organization name", () => {
      cy.visit(managePath);
      cy.get("#edit-org").type("Test University");
      cy.get("#edit-submit-rp-resources-admin").click();
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
      cy.get("table tbody").contains("Test University");
    });

    it("has edit link in operations column", () => {
      cy.visit(managePath);
      cy.get("table tbody tr").first().within(() => {
        cy.contains("Edit");
      });
    });

    it("can navigate to edit form for a resource", () => {
      cy.visit(managePath);
      cy.get("table tbody tr").first().within(() => {
        cy.contains("Edit").click();
      });
      cy.url().should("include", "/edit");
      cy.get("#edit-submit").should("exist");
    });
  });

});

describe("RP Documentation Index — public", () => {

  it("loads the /rp-documentation listing page", () => {
    cy.visit("/rp-documentation");
    cy.contains("Documentation for ACCESS-allocated resource providers");
  });

  it("lists resources that have descriptions", () => {
    cy.visit("/rp-documentation");
    cy.get(".view-rp-documentation-index .views-row").should("have.length.greaterThan", 0);
  });

});
