/*
* Anonymous user visits the affinity-group page and verifies images.
*/
describe('Anonymous user verifes the images on the affinity-group page', () => {
  it('should find expected stuff', () => {
    cy.visit('/affinity_groups');

    cy.get('img').each(($img) => {
      const url = ($img[0]?.src || $img[0]?.srcset);
      if (url) {
        cy.request(url).then((response) => {
          // verify the image response is 200, and has a non-zero length body
          // cy.task('log', 'verifying image "' + url + '"').then(() => {
          expect(response.status).to.eq(200);
          expect(response.body.length).to.be.greaterThan(0);

          // });
        });
      } else {
        throw new Error(`Found an image with no url src`);
      }
    });
  });
});
