describe('Admin user uses form to create a CI Link', () => {
  it('should create a CI-Link', () => {

    // login user with the "administrator" role
    cy.loginAs('apple@pie.org', 'Apple');
    cy.visit('admin/structure/webform/manage/resource/results/submissions');
    cy.get('#edit-search').type('cypress-ci-link-for-testing');
    cy.get('#edit-submit').click();
    cy.get("#edit")

    deleteTestCiLinks();

    // trying to find a way to recursively delete all ci-links
    function deleteTestCiLinks() {
      cy.get('body').then($mainContainer => {
        // cy.get('td').contains('cypress-ci-link-for-testing');
        const tds = $mainContainer.find('.webform-results-table');//.find('cypress-ci-link-for-testing');
        if (tds.length == 0) {
          cy.task('log', 'No more ci-links to delete');
        } else {
          cy.task('log', 'Found ' + tds.length + ' ci-links to delete');

          tds.each(function (index, td) {
            cy.task('log', 'index: ' + index);
            cy.task('log', 'td: ' + td);
            // cy.task('log', 'td.text(): ' + td.text());
            cy.task('log', 'td.innerText: ' + td.innerText);
            cy.task('log', 'td.textContent: ' + td.textContent);
            cy.task('log', 'td.innerHTML: ' + td.innerHTML);
            cy.task('log', 'td.outerHTML: ' + td.outerHTHML);
          });

          // const subs = cy.find('td').find('cypress-ci-link-for-testing');
          // if (subs.length == 0) {
          //   cy.task('log', 'No more dummy ci-links to delete');
          // } else {
          // {
          //   cy.get('td').contains('cypress-ci-link-for-testing').parent().parent()
          //     .then(function ($a) {
          //       const cilink_href = $a.attr('data-webform-href');
          //       cy.task('log', 'Deleting cilink_href: ' + cilink_href);
          //       cy.visit(cilink_href + '/delete').get('#edit-submit').click();
          //       deleteTestCiLinks();
          //     });
          // }
        }
      });
    }
  });
});
