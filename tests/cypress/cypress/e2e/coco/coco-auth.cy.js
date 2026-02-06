describe("This test verifies the coco domain for an authenticated user", () => {
  const testUsername = 'cypress-coco-test';
  const testEmail = 'cypress-coco-test@example.com';

  // Clean up any existing test user before running tests
  before(() => {
    cy.exec(`ddev drush user:cancel --delete-content -y ${testUsername}`, { failOnNonZeroExit: false });
  });

  // Clean up after tests complete
  after(() => {
    cy.exec(`ddev drush user:cancel --delete-content -y ${testUsername}`, { failOnNonZeroExit: false });
  });

  it("Authenticated/Unauthenticated user navigates through coco domain", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.get('img[alt="CoCo"]').should('be.visible');
    cy.contains('About Us').should('not.exist');
    cy.contains('Get Help').should('not.exist');
    cy.contains('Projects').should('not.exist');
    cy.contains('Campus Champions').should('be.visible');
    cy.contains('CaRCC').should('be.visible');
    cy.contains('CAREERS CT').should('be.visible');
    cy.contains('Community of Practice').should('be.visible');
    cy.contains('Consortium').should('be.visible');
    cy.contains('Grant-Funded Program').should('be.visible');
    cy.contains('Non-profit').should('be.visible');
    cy.contains('Suggest New Organization').should('be.visible');

    cy.contains('RCD+').click();
    cy.url().should('include', '/glossary#rcd');
    cy.contains('Research computing and data plus involves people, scholarship, and resources').should('be.visible')
  });

  it("Campus Champions check", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('Campus Champions').click();
    cy.contains('Campus Champions');
    cy.contains('https://campuschampions.org');
    cy.contains('Community of Practice');
    cy.contains('professional-development');
    cy.contains('The Campus Champions Program');
    cy.contains('Contact');
  });

  it("Suggest new Organization", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.contains('Suggest New Organization').click();
    cy.contains('Organization Name');
    cy.contains('Logo');
    cy.contains('Shortened Name');
    cy.contains('Organization Type');
    cy.contains('Contact Email');
    cy.contains('Description');
    cy.contains('Tags');
    cy.contains('Link URL');
  });

  it("Check Join", () => {
    cy.visit('/');
    cy.contains('Login to Suggest a New Listing');
    cy.contains('Join').click();
    cy.contains('Create new representative account');
    cy.get('input[name="mail"]').type(testEmail);
    cy.get('input[name="name"]').type(testUsername);
    cy.get('input[name="field_user_first_name[0][value]"]').type('Cypress');
    cy.get('input[name="field_user_last_name[0][value]"]').type('CocoTest');
    cy.get('input[name="field_access_organization[0][target_id]"]').type('MGHPCC');
    cy.get('#user-register-form > #edit-actions > #edit-submit').click();
  });
});
