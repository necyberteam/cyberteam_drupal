/*
* Anonymous user visits the affinity-group page and verifies images.
*/
describe('Anonymous user verifes the images on the affinity-group page', () => {
  it('should find expected stuff', () => {
    cy.visit('/affinity_groups');
    cy.get('img').each(($img) => cy.wrap($img).ampVerifyImage());
  });
});
