describe("verify the /about-us/affinity-groups-faq as anonymous & authenticated user", () => {
  it("Visitor test the affinity faq page", () => {
    cy.visit('/about-us/affinity-groups-faq');
    cy.contains('Affinity Groups FAQ');
    cy.contains('Affinity Groups encourage community members');
    cy.contains('What is an Affinity Group?');
    cy.contains('A group that encourages focused');
    cy.contains('What are the benefits of Affinity Groups?');
    cy.contains('Extra touchpoint when');
    cy.contains('Who can join an affinity group');
    cy.contains('Anyone with an account')
  });

  it("Administrator user test the affinity faq page", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/about-us/affinity-groups-faq');
    cy.contains('Affinity Groups FAQ');
    cy.contains('Affinity Groups encourage community members');
    cy.contains('What is an Affinity Group?');
    cy.contains('A group that encourages focused');
    cy.contains('What are the benefits of Affinity Groups?');
    cy.contains('Extra touchpoint when');
    cy.contains('Who can join an affinity group');
    cy.contains('Anyone with an account');
  });

});
