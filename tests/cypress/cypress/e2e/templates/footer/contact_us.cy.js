describe("This test goes over the Contact Us Page", () => {

  it("Unauthenticated user fills out the contact us form", () => {
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.get('input[name="name"]').type('Test');
    cy.get('input[name="mail"]').type('Test@email.com');
    cy.get('input[name="subject[0][value]"]').type('Test');
    cy.get('textarea[name="message[0][value]"]').type('Test');
    cy.get('input[name="op"]').click();
    cy.request('/contact').its('status').should('eq', 200);
  });

  it("Authenticated user fills out the contact us form", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/');
    cy.contains('Contact Us').click();
    cy.contains('Your name');
    cy.contains('Your email address');
    cy.get('input[name="subject[0][value]"]').type('Test');
    cy.get('textarea[name="message[0][value]"]').type('Test');
    cy.get('input[name="op"]').click();
    cy.request('/contact').its('status').should('eq', 200);
  });

});
