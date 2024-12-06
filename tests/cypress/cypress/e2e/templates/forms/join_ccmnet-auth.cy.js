describe("test CCMNET Page and submission", () => {

  it("test CCMNET Page and submission", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/form/get-updates-about-ccmnet');
    cy.contains('Get Updates about CCMNET');
    cy.contains('Join the CCMNET Mailing list to receive periodic updates.');
    cy.get('input[name="name[first]"]').type('Test');
    cy.get('input[name="name[last]"]').type('Test');
    cy.get('input[name="email"]').type('test@email.com');
    cy.get('#webform-submission-get-updates-about-ccmnet-add-form > #edit-actions > #edit-submit').click();
    cy.contains('Thanks for joining the CCMNet email list!');
  });

});
