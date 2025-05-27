describe("On the Add a Resource Page for authenticated users,", () => {

  it("Authenticated user fills out the resource form", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/knowledge-base/resources');
    cy.contains('Add a Resource').click();
    cy.url().should('include', 'form/resource');
    cy.contains('Title');
    cy.contains('Category');
    cy.contains('Tags');
    cy.contains('Skill Level');
    cy.contains('Description');
    cy.contains('Link to Resource');
    cy.contains('Link Title');
    cy.contains('Link URL');
    cy.contains('Add');
    cy.get('input[name="title"]').type('Test CI Link Title 2');
    cy.get('select[name="category"]').select('learning');
    cy.get('[data-tid="682"]').contains('login').click();
    cy.get('input[name="skill_level[304]"]').check();
    cy.get('textarea[name="description"]').type('Test');
    cy.get('input[name="link_to_resource[items][0][_item_][title]"]').type('Test');
    cy.get('input[name="link_to_resource[items][0][_item_][url]"]').type('http://example.com');
    cy.get('.form-item-domain').find('input').type('Careers{enter}');
    cy.get('input[name="op"]').contains('Submit').click();
    cy.contains('Test CI Link Title 2');
    cy.contains('Submission information');
    cy.contains('View');
    cy.contains('Edit');
    cy.contains('Title');
    cy.contains('Category');
    cy.contains('Tags');
    cy.contains('Skill Level');
    cy.contains('Description');
    cy.contains('Link to Resource');
    cy.contains('Submission information').click();
    cy.get('.nav > :nth-child(2) > .nav-link').contains('Edit').click();
  });

});
