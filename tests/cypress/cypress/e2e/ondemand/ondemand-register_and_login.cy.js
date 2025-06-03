describe("Test registration page", () => {
  it("Verify the register page is OnDemand-specific", () => {
    cy.visit('/user/register/ondemand');
    cy.contains('Create new OnDemand account');
  });
});

describe("Test login page", () => {
  it("Verify the login page has normal login and ACCESS methods", () => {
    cy.visit('/user/login');
    cy.contains('Create account');

    // verify username and password fields are present
    cy.get('#user-login-form input[name="name"]').should('exist');
    cy.get('#user-login-form input[name="pass"]').should('exist');
    cy.get('#user-login-form input[type="submit"]').should('exist');

    // verify ACCESS login button is present
    cy.get('#cilogon-auth-login-form input[type="submit"]').should('exist');
  });
});
