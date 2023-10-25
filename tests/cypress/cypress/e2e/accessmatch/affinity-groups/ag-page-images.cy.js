/*
* Anonymous user visits the affinity-group page and verifies images.
*/
describe('Anonymous user visit the affinity-group page', () => {
  it('should find expected stuff', () => {
    cy.visit('/affinity_groups');

    cy.get('img').each(($img) => {
      const url = $img[0]?.src || $img[0]?.srcset;
      if (url) {
        cy.task('log', 'verifying image "' + url + '"').then(() => {
          cy.wrap($img).scrollIntoView().should('be.visible').then(() => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
            expect($img[0].naturalHeight).to.be.greaterThan(0);
          });
        });
      } else {
        throw new Error(`Found an image with no url src`);
      }
    });
  });
});

