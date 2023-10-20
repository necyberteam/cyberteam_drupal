//
//
describe('experiment with logging', () => {
  it('should complete successfully', () => {//broken-link.cy.js

    // cy.exec(`rm -rf logs/${Cypress.spec.name}.log.json`);
    cy.exec(`echo "start" > logs/test.log.txt`);
    cy.exec(`echo "testing123" >> logs/test.log.txt`);

    // cy.
    //   it('should complete successfully', () => {
    //     cy.ampLog("this is a zzzz test");
    //     cy.saveAmpLog();
    //   })
  });
});
