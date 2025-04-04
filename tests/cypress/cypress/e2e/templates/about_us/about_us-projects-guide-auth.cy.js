describe("verify the /about-us/project-guide as anonymous & authenticated user", () => {
  it("Authenticated user test the project guide", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/about-us/project-guide');
    cy.contains('Project Guide');
    cy.contains('Cyberteam Project Procedures');
    cy.contains('Project Solicitation and Submission');
    cy.contains('Publishing a Project');
    cy.contains('Projects per Institution');
    cy.contains('Projects per Student');
    cy.contains('Recruiting Students');
    cy.contains('Scheduling and Check-ins');
    cy.contains('Launch Presentation');
    cy.contains('Project Updates');
    cy.contains('Wrap Presentation');
    cy.contains('Finishing a Project');
  });

});
