describe("Test Content Assist API Endpoints", () => {

  it("POST /api/suggest-tags returns 307 redirect for anonymous users", () => {
    cy.request({
      method: 'POST',
      url: '/api/suggest-tags',
      body: { text: 'This is a sufficiently long text string that should be well over one hundred characters in length so that it passes the minimum text length validation requirement for the suggest tags endpoint.' },
      headers: { 'Content-Type': 'application/json' },
      failOnStatusCode: false,
      followRedirect: false,
    }).then((response) => {
      expect(response.status).to.eq(307);
    });
  });

  it("POST /api/suggest-summary returns 307 redirect for anonymous users", () => {
    cy.request({
      method: 'POST',
      url: '/api/suggest-summary',
      body: { text: 'This is a sufficiently long text string that should be well over one hundred characters in length so that it passes the minimum text length validation requirement for the suggest summary endpoint.' },
      headers: { 'Content-Type': 'application/json' },
      failOnStatusCode: false,
      followRedirect: false,
    }).then((response) => {
      expect(response.status).to.eq(307);
    });
  });

});
