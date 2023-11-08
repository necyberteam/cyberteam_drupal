/*
   Verify the tags page.
*/
describe("Verify the tags page", () => {
  it("Tests the tags page", () => {

    cy.visit("/tags");

    cy.get(".page-title").contains("Tags");

    // check breadcrumbs
    const crumbs = [
      ['Support', '/'],
      ['Tags', null]
    ];
    cy.checkBreadcrumbs(crumbs);

    // each h2 is a tag category -- verify each h2 with the each() function
    cy.get('.block-system-main-block')
      .find('h2.mt-10')
      .each(($el) => {

        // cy.task('log', 'h2: ' + $el.text());

        // verify there's a block with the id of the h2 text
        cy.get('.block-system-main-block')
          .get('[id="' + $el.text() + '"]')
          .contains($el.text());

        // each category should have a bunch of tags - get an alias to that element
        cy.get('.block-system-main-block')
          .get('[id="' + $el.text() + '"]')
          .next() // in the DOM, this gets the element containing all the tags
          .as('tag-list');

        // verify there are more than 0 tags per category
        cy.get('@tag-list')
          .find('a').should('have.length.gt', 0);

        // verify each tag has a good href
        cy.get('@tag-list')
          .find('a')
          .each($a => {
            expect($a).to.have.attr("href", '/tags/' + $a.text());
          });

        // verify 2nd sidebar has same tag category
        cy.get('.region.region-sidebar-second')
          .contains($el.text())
          .should('have.attr', 'href', '#' + $el.text());
      });
  });
});
