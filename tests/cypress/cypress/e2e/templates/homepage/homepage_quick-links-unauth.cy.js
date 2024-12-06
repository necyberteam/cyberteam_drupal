describe("test quick links on home page", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Ask the Community', () => {
    cy.get('a[href="https://ask.cyberinfrastructure.org"]').contains('Ask the Community');
  });

  it('should navigate to Find Knowledge Base Resources', () => {
    cy.contains('Find Learning Resources').click();
    cy.url().should('include', '/knowledge-base/resources');
  });

  it('should navigate to Project Submission Form', () => {
    cy.contains('Project Submission Form').click();
    cy.url().should('include', '/form/project');
  });

  it('should navigate to All Projects', () => {
    cy.contains('All Projects').click();
    cy.url().should('include', '/projects');
  });

  it('should navigate to Find Projects by Tag', () => {
    cy.contains('Find Projects by Tag').click();
    cy.url().should('include', '/tags');
  });

  it('should not see Join the team', () => {
    cy.contains('Join the team').should('not.exist');
  });

});
