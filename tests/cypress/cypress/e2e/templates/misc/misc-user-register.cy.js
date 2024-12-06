describe("This test covers the Register Page", () => {
  it("Verify the Join button links to join", () => {
    cy.visit('/');
    cy.contains('Join').click();
    cy.url().should('include', '/user/register');
    cy.contains('Please select an account type below to create')
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
    cy.get('input[name="mail"]').type('Test@mail.com');
    cy.get('input[name="name"]').type('Test');
    cy.get('input[name="field_user_first_name[0][value]').type('Test');
    cy.get('input[name="field_user_last_name[0][value]"]').type('Test');
    cy.get('input[name="field_access_organization[0][target_id]"]').type('MGHPCC');

    // Click the submit button
    cy.get('#user-register-form > #edit-actions > #edit-submit').click();

    // Assert the URL is "/people/card"
    //cy.url().should('include', '/people/card');

  });

  it("Delete test account so future runs do not fail", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/admin/people');
    cy.get(':nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();
    cy.get('#edit-delete').click();
    cy.get('#edit-user-cancel-method-user-cancel-delete').check();
    cy.get('#edit-submit').click();
    cy.contains('Account Test Test has been deleted');
  });

});
