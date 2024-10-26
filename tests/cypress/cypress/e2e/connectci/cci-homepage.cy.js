/*
    This test is specifically focused on the CCI Homepage tested for an unauthenticated user.
*/
describe("Unauthenticated user tests the CCI Hompage", () => {
  it("Verify the main logo goes to home page", () => {
    cy.visit('/');
    cy.url().should('include', '/');
    cy.get('.logo').click();
    cy.url().should('include', '/');
  });

  it("Verify the main page has expected content", () => {
    cy.visit('/'); // Adjust the URL as needed
    cy.contains('Welcome to Connect Cyberinfrastructure').should('be.visible');
    cy.contains('A landing page for all our affiliated sites.').should('be.visible');
    cy.contains('Connect.Cyberinfrastructure is a family of portals').should('be.visible');
    cy.contains('Card View').should('be.visible');
    cy.contains('List View').should('be.visible');
    cy.contains('CAREERS Cyberteam').should('be.visible');
    cy.contains('Great Plains Cyberteam').should('be.visible');
    cy.contains('ACCESS Support').should('be.visible');
    cy.contains('Supporting the ACCESS Research Community').should('be.visible');
    cy.contains('List View').click();
    cy.contains('Programs').should('be.visible');
    cy.contains('Affinity Groups').should('be.visible');

    cy.visit('/');
    cy.get('a[href="https://support.access-ci.org/"] h5').should('contain', 'ACCESS Support');
    cy.get('a[href="https://careers-ct.cyberinfrastructure.org/"] h5').should('contain', 'CAREERS Cyberteam');
    cy.get('a[href="https://greatplains.cyberinfrastructure.org/"] h5').should('contain', 'Great Plains Cyberteam');
    cy.get('a[href="https://kycyberteam.cyberinfrastructure.org/"] h5').should('contain', 'Kentucky Cyberteam');
    cy.get('a[href="https://necyberteam.org/"] h5').should('contain', 'Northeast Cyberteam');
    cy.get('a[href="https://ask.cyberinfrastructure.org/c/rmacc/65"] h5').should('contain', 'RMACC');
    cy.get('a[href="https://sweeter.cyberinfrastructure.org/"] h5').should('contain', 'SWEETER Cyberteam');
    cy.get('a[href="https://trecis.cyberinfrastructure.org/"] h5').should('contain', 'TRECIS Cyberteam');
    cy.get('a[href="https://campuschampions.cyberinfrastructure.org/"] h5').should('contain', 'Campus Champions');
    cy.contains('Anvil').click();
    cy.url().should('include', 'affinity-groups/anvil');
    cy.contains('Purdue University is the home of Anvil').should('be.visible');
  });
  it("User is on the homepage and follows contact us", () => {
    cy.visit('/'); // Adjust the URL as needed
    cy.contains('Contact Us').click();
    cy.url().should('include', 'contact/connect_ci');
    cy.contains('Your name').should('be.visible');
  });
  it("Authenticated User is on the homepage and follows contact us", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.url().should('include', 'contact/connect_ci');
    cy.contains('Your name').should('be.visible');
  });

});
