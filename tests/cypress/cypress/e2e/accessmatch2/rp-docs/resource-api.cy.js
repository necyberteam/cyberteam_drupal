describe("Resource Documentation API", () => {

  it("GET /api/1.0/resources returns only documented resources by default", () => {
    cy.request("/api/1.0/resources").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("count");
      expect(response.body).to.have.property("resources");
      expect(response.body.resources).to.be.an("array");
      expect(response.body.count).to.be.greaterThan(0);
      // Every returned resource must have a description (documented=true default).
      response.body.resources.forEach((r) => {
        expect(r.has_documentation).to.eq(true);
      });

      const first = response.body.resources[0];
      expect(first).to.have.property("nid");
      expect(first).to.have.property("title");
      expect(first).to.have.property("resource_id");
      expect(first).to.have.property("url");
    });
  });

  it("GET /api/1.0/resources?documented=false includes undocumented CIDER stubs", () => {
    cy.request("/api/1.0/resources?documented=false").then((full) => {
      cy.request("/api/1.0/resources").then((documented) => {
        // The unfiltered response should be at least as large as the default.
        expect(full.body.count).to.be.greaterThan(documented.body.count);
      });
    });
  });

  it("GET /api/1.0/resources/test-alpha-9999 returns full detail", () => {
    cy.request("/api/1.0/resources/test-alpha-9999").then((response) => {
      expect(response.status).to.eq(200);

      const body = response.body;
      expect(body.title).to.eq("Test Resource Alpha");
      expect(body.resource_id).to.eq("test-alpha-9999");
      expect(body.org_name).to.eq("Test University");
      expect(body.resource_type).to.eq("Compute");
      expect(body.mfa_required).to.eq(true);
      expect(body.account_required).to.eq(true);

      // Scalar text/link fields
      expect(body.login_text).to.include("getting started guide");
      expect(body.jobs_info).to.include("Alpha uses Slurm for job scheduling");
      expect(body.software_list_url).to.include("alpha.test.example.edu/software");

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

      // SSH logins use structured fields (hostname / placeholder / docs_url).
      expect(body.ssh_logins).to.be.an("array");
      expect(body.ssh_logins).to.have.length(3);
      expect(body.ssh_logins[0]).to.have.property("hostname");
      expect(body.ssh_logins[0].hostname).to.include("login01.alpha.test.example.edu");
      expect(body.ssh_logins[0]).to.not.have.property("url");
      // login03 has an explicit docs URL; assert it survives to the API.
      const login03 = body.ssh_logins.find((l) => l.hostname.startsWith("login03"));
      expect(login03).to.exist;
      expect(login03.docs_url).to.include("docs.example.edu/alpha/login03");

      expect(body.support_links).to.be.an("array");
      expect(body.support_links).to.have.length(3);
    });
  });

  it("GET /api/1.0/resources/nonexistent returns 404", () => {
    cy.request({
      url: "/api/1.0/resources/nonexistent",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("error");
    });
  });

  it("Sparse resource (Beta) returns empty paragraph arrays", () => {
    cy.request("/api/1.0/resources/test-beta-9998").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Test Resource Beta");
      expect(response.body.description).to.include("CPU-only cluster");
      expect(response.body.file_transfer).to.have.length(0);
      expect(response.body.storage).to.have.length(0);
      expect(response.body.queue_specs).to.have.length(0);
      expect(response.body.datasets).to.have.length(0);
    });
  });

  it("Beta inherits support_links / office_hours / software_list_url from its Group", () => {
    cy.request("/api/1.0/resources/test-beta-9998").then((response) => {
      const body = response.body;
      // Beta has no own values for these — the API returns the Group's.
      expect(body.support_links).to.be.an("array");
      const titles = body.support_links.map((l) => l.title);
      expect(titles).to.include("Group User Guide");
      expect(titles).to.include("Group Ticket System");
      expect(body.office_hours).to.include("group.test.example.edu/office-hours");
      expect(body.software_list_url).to.include("group.test.example.edu/software");
    });
  });

  it("Alpha's own values override the Group (not inherited)", () => {
    cy.request("/api/1.0/resources/test-alpha-9999").then((response) => {
      const body = response.body;
      const titles = body.support_links.map((l) => l.title);
      expect(titles).to.not.include("Group User Guide");
      expect(body.office_hours).to.include("alpha.test.example.edu/office-hours");
      expect(body.software_list_url).to.include("alpha.test.example.edu/software");
    });
  });

  it("Partial resource (Gamma) returns only populated sections", () => {
    cy.request("/api/1.0/resources/test-gamma-9997").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Test Resource Gamma");
      expect(response.body.storage).to.have.length(2);
      expect(response.body.file_transfer).to.have.length(0);
      expect(response.body.queue_specs).to.have.length(0);
      expect(response.body.support_links).to.have.length(1);
    });
  });

  it("Gamma (not a Group member) does not inherit Group values", () => {
    cy.request("/api/1.0/resources/test-gamma-9997").then((response) => {
      const body = response.body;
      const titles = body.support_links.map((l) => l.title);
      expect(titles).to.not.include("Group User Guide");
      expect(body.office_hours).to.not.include("group.test.example.edu");
    });
  });

});
