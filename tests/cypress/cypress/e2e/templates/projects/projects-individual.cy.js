describe("test individual projects page", () => {

  it("Unath user must login to create a project", () => {
    cy.visit('/projects');
    cy.contains('Login to Add New Project').click();
    cy.url().should('include', '/user/login');
    cy.contains('Login with');
  });

  it("Auth user does not need to login to create a project", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/projects');
    cy.contains('Submit New Project').click();
    cy.contains('Project Description');
  });

  it("Verify home page shows project", () => {
    //cy.visit('/');
    //cy.contains('Featured Projects').click();
    //cy.contains('test-create-project-title');
    //cy.contains('login').click();
    //cy.url().should('include', '/tags/login');
  });

  it("Verify home page shows project for authenticated user", () => {
    //cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    //cy.visit('/');
    //cy.contains('Featured Projects').click();
    //cy.wait(2000);
    //cy.contains('test-create-project-title');
    //cy.contains('login').click();
    //cy.url().should('include', '/tags/login');
  });

  it("Verify unauth user can see test project", () => {
    cy.visit('/projects');
    cy.get('input[name="search"]').type('CREATE');
    cy.contains('test-create-project-title').click();
    cy.contains('test-create-project-title');
    cy.contains('login');
    cy.contains('Submitted By:');
    cy.contains('At-Large');
    cy.contains('In Progress');
    cy.contains('test@email.com');
    cy.contains('test Project Institution');
    cy.contains('test Address');
    cy.contains('test Address 2');
    cy.contains('test City/Town');
    cy.contains('Alabama');
    cy.contains('98765');
    cy.contains('test project description');
    cy.contains('http://test.com');
    cy.contains('33');
    cy.contains('I’m interested').should('not.exist');
  });

  it("Verify auth user can see test project", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/projects');
    cy.get('input[name="search"]').type('CREATE');
    cy.contains('test-create-project-title').click();
    cy.contains('test-create-project-title');
    cy.contains('login');
    cy.contains('Submitted By:');
    cy.contains('At-Large');
    cy.contains('In Progress');
    cy.contains('test@email.com');
    cy.contains('test Project Institution');
    cy.contains('test Address');
    cy.contains('test Address 2');
    cy.contains('test City/Town');
    cy.contains('Alabama');
    cy.contains('98765');
    cy.contains('test project description');
    cy.contains('http://test.com');
    cy.contains('33');
  });

});
