//
// Anonymous user visit the affinity-group page
//
describe('Anonymous user visit the affinity-group page', () => {
  it('should find expected stuff', () => {

    cy.visit('/affinity-groups');

    cy.url().then((url) => {
      cy.log('Current URL is: ' + url)
    })

    cy.contains('Request a group')
      .invoke('attr', 'href')
      .then(href => {
        cy.log('href is: ' + href)
        expect(href).to.have.string('/form/affinity-group-request');

      });


    // cy.contains('Request a group')
    //   .invoke('attr', 'href')
    //   .then(href => {
    //     cy.request({
    //       url: href,
    //       followRedirect: false, // turn off following redirects
    //     }).then((resp) => {
    //       cy.log("resp = " + JSON.stringify(resp, null, '\t'));

    //       expect(resp.redirectedToUrl).to.have.string('user/login?destination=/form/affinity-group-request');
    //     })
    //   })


    // cy.contains('Request a group')
    //   .invoke('attr', 'href')
    //   .then(href => {
    //     cy.request({
    //       url: href,
    //       followRedirect: false, // turn off following redirects
    //     }).should((response) => {

    //       cy.log("response = " + JSON.stringify(response, null, '\t'));

    //       // expect(response)

    //       // cy.log("resp = " + JSON.stringify([...resp], null, '\t'));

    //       // user/login?destination=/form/affinity-group-request
    //     })
    //   })


    // .its(resp).should('contain', 'user/login?destination=/form/affinity-group-request')


    cy.contains('Request a group')
      .invoke('attr', 'href')
      .then(href => {
        cy.log('href is: ' + href)
      });

    //     cy.visit(href).then(() => {
    //       cy.url().should('include', 'https://cilogon.org/authorize');
    //     });
    //     // .its('status')
    //     // .should('eq', 200);

    //   });

    // cy.contains('Request a group').click().then(() => {
    //   cy.url().then((url) => {
    //     cy.log('Current URL is: ' + url)
    //   })
    // });


    // cy.contains('Request a group').click().then(() => {
    // });


    // cy.url().then((url) => {
    //   cy.log('Current URL is: ' + url)
    // })


    // cy.url().should('include', 'https://cilogon.org/authorize');

    // cy.location('pathname').should('include', 'https://cilogon.org/authorize');


    //.then(() => {
    // cy.url().should('include', 'https://cilogon.org/authorize');
    // });
    // cy.get('.bg-light-teal > .btn').click();
    // cy.get(':nth-child(1) > [headers="view-title-table-column"] > a').click();
    // cy.get(':nth-child(7) > .fixed-width-150 > .\\[\\&_img\\]--object-contain > a > .image-style-landscape__480x220__keep-ratio-').click();
    // cy.get(':nth-child(42) > .square-tags > .field > .field__items > .field__item > .font-normal').click();
  });
})
