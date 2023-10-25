/*
* Anonymous user visits the affinity-group page and verifies images.
*
* This passes locally, but not passing headlessly.  Will investigate.
*/
describe('Anonymous user visit the affinity-group page', () => {
  it('should find expected stuff', () => {

    // Verify all images appear correctly.
    cy.get("img").each(($img) => {
      cy.wrap($img).invoke('attr', 'src').then((src) => {
        cy.task('log', 'verifying image "' + src + '"');
        cy.wrap($img).scrollIntoView().should('be.visible');
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });
});

