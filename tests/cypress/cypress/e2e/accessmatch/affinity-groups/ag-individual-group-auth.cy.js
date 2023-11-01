/**
 * Authenticated user tests the Individual Affinity Groups page.
 *
 * Only addition from anonymous is ability to see AG members.
 *
 * TODO - verify members button appears for to AG coordinator, and does not
 * appear for non-coordinator.
 */
describe("Authenticated user tests the Individual Affinity Groups", () => {
  it("Should test the Individual Affinity Groups page", () => {

    cy.loginAs('authenticated@amptesting.com', '6%l7iF}6(4tI');

    cy.visit("/affinity-groups/access-support");

    cy.contains("View Members")
      .should('have.attr', 'href', '/affinity-groups/618/users/ACCESS Support?nid=327')
      .click();

    cy.get('.page-title').contains('Affinity Group Members');
    // <h1 class="page-title">ACCESS Support</h1>

    // TODO - verify members button appears for to AG coordinator, and does not
    // appear for non-coordinator.

  });
});
