describe('breaking test to trigger slack notification', () => {
  it('checks', () => {
    cy.task("log", "breaking test to trigger slack notification");
    var url = 'https://example.cypress.io';

    cy.task("log", "trying to reach '" + url + "'");
    cy.visit(url);


    // cy.get('#users').then(function ($a) {
    //   // extract the fully qualified href property
    //   const href = $a.prop('href')

    cy.contains('Traversal').then(function ($a) {
      // extract the fully qualified href property
      const href = $a.prop('href')
      cy.log(href);
    });

    // cy.get('a').each(($el) => {
    //   const herf = $el.attr('href');
    //   cy.log(herf);

    //   // then I will do your test:
    //   // cy.visit(link);
    //   // cy.title().should('include', 'Text');

    // });
    // cy.task("log", "looking for text that doesn't exist, should break");
    // cy.contains('this-will-break');
  })
})
