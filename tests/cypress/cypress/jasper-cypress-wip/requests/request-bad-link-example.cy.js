//
// Authenticated user requests to join campus champions
//
describe('Report broken links', () => {
  it('should complete successfully', () => {
    cy.request({
      url: 'https://xdmod.access-cs.org/',
      failOnStatusCode: false
    }).then((response) => {
      // countLog(`**depth ${depth}** -- link #${i}: "${href}" - status code: ${response.status}`);
      if (response.status >= 300) {
        visitedLinks.add(href);
        cy.log(`**BAD LINK**: "${href} on url "${url}" - status code: ${response.status}`);
      } else {
        cy.log(`**GOOD LINK**: "${href} on url "${url}" - status code: ${response.status}`);
      }
    });
  });
});

