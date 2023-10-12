describe('Test ASP /ccep page', () => {
  it('tests the page', () => {
    cy.visit('/ccep');
    // cy.contains("xxxx").should('not.exist');
    // cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ").should('not.exist');
    cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ");
    // cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ").should("be.visible").not();
    cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ").should("not.be.visible");
    cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ").should("be.visible");
    cy.contains("Intro to ACCESS lecture").click();
    cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ");
    cy.contains("Prepare an Intro to ACCESS lecture, tutorial, or ").should("be.visible");
  })
})
