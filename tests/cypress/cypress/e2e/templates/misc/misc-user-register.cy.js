describe("This test covers the Register Page", () => {
  const testEmail = 'cypress-register-test@mail.com';
  const testUsername = 'cypress-register-test';

  // Clean up any existing test user before running tests
  before(() => {
    cy.exec(`ddev drush user:cancel --delete-content -y ${testUsername}`, { failOnNonZeroExit: false });
  });

  // Clean up after tests complete
  after(() => {
    cy.exec(`ddev drush user:cancel --delete-content -y ${testUsername}`, { failOnNonZeroExit: false });
  });

  it("Verify the Join button links to join", () => {
    cy.visit('/');
    cy.contains('Join').click();
    cy.url().should('include', '/user/register');
    cy.contains('Please select an account type below to create');
    cy.visit('/user/register');

    // Click the "Student Facilitator" link
    cy.get('.display-great-plains > .card-body > :nth-child(2) > .stretched-link').click();

    // Assert the presence of specific text elements
    cy.contains('Create new student-facilitator account');
    cy.contains('Program');
    cy.contains('Email address');
    cy.contains('Username');
    cy.contains('First Name');
    cy.contains('Last Name');
    cy.contains('Organization');
    cy.contains('Academic Status');
    cy.contains('HPC Experience');
    cy.contains('CV/Resume');
    cy.contains('Time zone');
    cy.contains('Citizenships').should('not.exist');

    cy.visit('/user/register');

    cy.get('.display-great-plains > .card-body > :nth-child(3) > .stretched-link').click();

    cy.contains('Create new mentor account');
    cy.contains('Program');
    cy.contains('Email address');
    cy.contains('Username');
    cy.contains('First Name');
    cy.contains('Last Name');
    cy.contains('Organization');
    cy.contains('CV/Resume');
    cy.contains('Time zone');
    cy.contains('Citizenships').should('not.exist');

    cy.visit('/user/register');

    cy.get('.display-great-plains > .card-body > :nth-child(4) > .stretched-link').click();
    cy.contains('researcher/educator').click();

    // Assert the presence of the text "Create new researcher/educator account"
    cy.contains('Create new researcher/educator account');

    // Select "At-Large" from the "Program" dropdown
    cy.get('[value="345"]').click();

    // Fill in the form fields with specified values
    cy.get('input[name="mail"]').type(testEmail);
    cy.get('input[name="name"]').type(testUsername);
    cy.get('input[name="field_user_first_name[0][value]').type('Cypress');
    cy.get('input[name="field_user_last_name[0][value]"]').type('RegisterTest');
    cy.get('input[name="field_access_organization[0][target_id]"]').type('MGHPCC');

    // Click the submit button
    cy.get('#user-register-form > #edit-actions > #edit-submit').click();

    // Verify registration was successful (user is redirected or sees confirmation)
    cy.url().should('not.include', '/user/register');
  });
});
