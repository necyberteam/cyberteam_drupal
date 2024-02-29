describe('Test ASP /ccep page', () => {
  it('tests the page', () => {
    cy.visit('/ccep');
    cy.get(':nth-child(4) > .btn')
      .contains('Apply to CCEP')
      .click();
    cy.origin('https://docs.google.com', () => {
      cy.contains('ACCESS CSSN Community Engagement Program (CCEP) Travel Award Request');
    });
    cy.task("log", "ccep test complete");
  })
})
