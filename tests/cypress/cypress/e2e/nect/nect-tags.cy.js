/*
   Verify the tags page.
*/
describe("Verify the tags page", () => {
  it("Tests the tags page", () => {

    cy.visit("/tags");

    cy.get("h1").contains("Tags");

    const topTags = [
      'Admin and Support',
      'AI/ML',
      'Analysis and Algorithms',
      'Cloud',
      'Data Storage',
      'Debugging and Optimization',
      'Domain Tools',
      'Gateways and Portals',
      'Hardware and Architecture',
      'Linux and Shell Scripting',
      'NSF ACCESS',
      'NSF ACCESS Resources',
      'Professional Development',
      'Programming',
      'Schedulers',
      'Science Domains',
      'Security',
      'Software Installations',
    ];

    topTags.forEach(function (value) {
        cy.get('#block-nect-views-block-node-add-tags-block-3')
          .children()
          .should('contain', value)
    });

    // each h2 is a tag category -- verify each h2 with the each() function
    cy.get('.views-element-container')
      .find('h2.mt-5')
      .each(($el) => {
        // idText is the id of the h2, but with & replaced by &amp;
        const idText = $el.text().replace(/&/g, '&amp;');
        // cy.task('log', 'h2: ' + $el.text());

        // verify there's a block with the id of the h2 text
        cy.get('.views-element-container')
          .get('[id="' + idText + '"]')
          .contains($el.text());

        // each category should have a bunch of tags - get an alias to that element
        cy.get('.views-element-container')
          .get('[id="' + $el.text() + '"]')
          .parent().siblings('div') // in the DOM, this gets the element containing all the tags
          .as('tag-list');

        // verify there are more than 0 tags per category
        cy.get('@tag-list')
          .find('a').should('have.length.gt', 0);


        // verify each tag has a good href
        cy.get('@tag-list')
          .find('a')
          .each($a => {
            if (!$a.text().includes('fluid-dynamics')) {
              expect($a).to.have.attr("href", '/tags/' + $a.text().toLowerCase().replace('++', '%252B%252B'));
            }
          });

        // verify 2nd sidebar has same tag category
        cy.get('#block-nect-views-block-node-add-tags-block-3')
          .contains($el.text())
          .should('have.attr', 'href', '#' + $el.text());
      });
  });
});
