//
// Authenticated user requests to join campus champions
//
describe('Report broken links', () => {
  it('should complete successfully', () => {//broken-link.cy.js
    cy.visit('/');
    cy.get('a').each(link => {
      // var href = '/junk';
      // var href = link.prop('href') + '-dead';
      var href = link.prop('href');
      // cy.task('log', 'checking "' + href + '"');
      if (href)
        cy.request({
          url: href,
          failOnStatusCode: false
        }).then((response) => {
          cy.task('log', `"${href}" request status code: ${response.status}`);

          // cy.then(() => { throw new Error('stopping'); });
        });
      // cy.log('checked "' + href + '"');
    })
  });
});
