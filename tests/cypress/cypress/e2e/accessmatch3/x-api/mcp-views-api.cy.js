describe("Test MCP Views JSON:API Endpoints", () => {

  it("GET /jsonapi/views/mcp_my_announcements/page_1 returns valid JSON:API response", () => {
    cy.request('/jsonapi/views/mcp_my_announcements/page_1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type').that.includes('application/vnd.api+json');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
    });
  });

  it("GET /jsonapi/views/mcp_my_affinity_groups/page_1 returns valid JSON:API response", () => {
    cy.request('/jsonapi/views/mcp_my_affinity_groups/page_1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type').that.includes('application/vnd.api+json');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
    });
  });

});
