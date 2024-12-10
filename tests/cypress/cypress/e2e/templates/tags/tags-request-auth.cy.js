describe("Authenticated user on the Request Tag Page", () => {

  it("Authenticated user fills out the tags form", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/tags');
    cy.contains('Request Tag').click();
    cy.url().should('include', '/form/request-tag');
    cy.contains('Request Tag');
    cy.contains('Tag Request Name');
    cy.contains('Suggested Parent Tag');
    cy.get('input[name="tag_request_name"]').type('TEST');
    cy.get('select[name="suggested_parent_tag"]').select('684');
    cy.get('#webform-submission-request-tag-add-form > #edit-actions > #edit-submit').click();
    cy.contains('Your request has been submitted! Thank you! We will add your tag soon. Please check back shortly to use your new tag.');
  });

});
