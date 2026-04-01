describe("Resource Documentation API", () => {

  it("GET /api/resources returns list of resources", () => {
    cy.request("/api/resources").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("count");
      expect(response.body).to.have.property("resources");
      expect(response.body.resources).to.be.an("array");
      expect(response.body.count).to.be.greaterThan(0);

      const first = response.body.resources[0];
      expect(first).to.have.property("nid");
      expect(first).to.have.property("title");
      expect(first).to.have.property("resource_id");
      expect(first).to.have.property("url");
    });
  });

  it("GET /api/resources/test-alpha-9999 returns full detail", () => {
    cy.request("/api/resources/test-alpha-9999").then((response) => {
      expect(response.status).to.eq(200);

      const body = response.body;
      expect(body.title).to.eq("Test Resource Alpha");
      expect(body.resource_id).to.eq("test-alpha-9999");
      expect(body.org_name).to.eq("Test University");
      expect(body.resource_type).to.eq("Compute");
      expect(body.mfa_required).to.eq(true);
      expect(body.account_required).to.eq(true);

      // Paragraph data
      expect(body.file_transfer).to.be.an("array");
      expect(body.file_transfer).to.have.length(3);
      expect(body.file_transfer[0].method).to.eq("Globus");
      expect(body.file_transfer[0].recommended).to.eq(true);

      expect(body.storage).to.be.an("array");
      expect(body.storage).to.have.length(4);
      expect(body.storage[0].directory).to.eq("Home");

      expect(body.queue_specs).to.be.an("array");
      expect(body.queue_specs).to.have.length(3);
      expect(body.queue_specs[0].name).to.eq("gpu-standard");

      expect(body.datasets).to.be.an("array");
      expect(body.datasets).to.have.length(2);

      expect(body.top_software).to.be.an("array");
      expect(body.top_software).to.have.length(5);

      expect(body.ssh_logins).to.be.an("array");
      expect(body.ssh_logins).to.have.length(3);

      expect(body.support_links).to.be.an("array");
      expect(body.support_links).to.have.length(3);
    });
  });

  it("GET /api/resources/nonexistent returns 404", () => {
    cy.request({
      url: "/api/resources/nonexistent",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("error");
    });
  });

  it("Sparse resource (Beta) returns empty paragraph arrays", () => {
    cy.request("/api/resources/test-beta-9998").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Test Resource Beta");
      expect(response.body.description).to.include("CPU-only cluster");
      expect(response.body.file_transfer).to.have.length(0);
      expect(response.body.storage).to.have.length(0);
      expect(response.body.queue_specs).to.have.length(0);
      expect(response.body.datasets).to.have.length(0);
    });
  });

  it("Partial resource (Gamma) returns only populated sections", () => {
    cy.request("/api/resources/test-gamma-9997").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Test Resource Gamma");
      expect(response.body.storage).to.have.length(2);
      expect(response.body.file_transfer).to.have.length(0);
      expect(response.body.queue_specs).to.have.length(0);
      expect(response.body.support_links).to.have.length(1);
    });
  });

});
