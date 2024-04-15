/*
* Anonymous user visits the affinity-group page and verifies images.
*/
describe('Anonymous user verifes the images on the affinity-group page', () => {
  it('should find expected stuff', () => {
    cy.visit('/affinity-groups');
    cy.verifyImages();
  });
});
