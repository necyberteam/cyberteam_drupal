describe('cypress', () => {
  it('messing about with cypress', () => {

    // Set an environment variable
    Cypress.env('MY_VARIABLE', 'my_value22');

    // Get an environment variable
    const myVariable = Cypress.env('MY_VARIABLE');

    cy.log('myVariable = ' + myVariable);
    cy.log('myVariable2 = ' + Cypress.env('MY_VARIABLE2'));

    cy.log('e2e.baseUrl = ' + Cypress.env('e2e.baseUrl'));
    cy.log('env.baseUrl = ' + Cypress.env('baseUrl'));
  });
});
