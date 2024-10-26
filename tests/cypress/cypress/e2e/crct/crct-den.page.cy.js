/*
    This test is specifically focused on the CCI Homepage tested for an unauthenticated user.
*/
describe("user tests the crct Hompage", () => {
  it("Unauthenticated user Test the Distributed Experts Network section on the Homepage", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/');
    cy.contains('NEW PROGRAM!');
    cy.contains('Distributed Experts Network (DEN)');
    cy.contains('Our experts can assist with computational challenges');
    cy.contains('Request a consult and we will find an expert who can help you.');
    cy.get('img[alt="Have a compute question no one in your lab can answer? Need help deciding which modeling tool to deploy? Wondering where to get more cycles?"]');
    cy.contains('REQUEST A CONSULT');
    cy.contains('FIND OUT MORE');
  });

  it("user Test the Distributed Experts Network page", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/distributed-experts-network');
    cy.contains('Distributed Experts Network (DEN)');
    cy.contains('Our experts can assist with computational challenges at small and mid-sized institutions.');
    cy.contains('Request a consult and we will find an expert who can help you.');
    cy.contains('REQUEST A CONSULT');
    cy.contains('A Sample of DEN Expertise Areas');
    cy.contains('Astrophysics');
    cy.contains('Bioinformatics');
    cy.contains('Computational Chemistry');
    cy.contains('Digital Humanities');
    cy.contains('Economics');
    cy.contains('Machine Learning');
    cy.contains('Example Projects');
    cy.contains('Getting Started with Jupyter Notebooks');
    cy.contains('A researcher who was recently granted a startup allocation on a');
    cy.contains('Integration of a New Sequencer');
    cy.contains('A lab acquires a new sequencer that requires a Linux based “headnode”');
    cy.contains('Electronic Structure Software set-up');
    cy.contains('A Chemistry Researcher can use help selecting installing, configuring,');
    cy.contains('Optimizing Workflow');
    cy.contains('A researcher got funding to purchase dedicated resource access and');
    cy.get('img[alt="Have a compute question no one in your lab can answer? Need help deciding which modeling tool to deploy? Wondering where to get more cycles?"]');
  });

  it("user Test the Distributed Experts Network for", () => {
    cy.loginUser('authenticated@amptesting.com', '6%l7iF}6(4tI');
    cy.visit('/distributed-experts-network');
    cy.contains('REQUEST A CONSULT').click();
    cy.url().should('include', '/form/distributed-experts-network-help');
    cy.contains('Distributed Experts Network Help Request Form');
    cy.get('#edit-institution').type('167394');
    cy.get('#edit-please-provide-a-brief-description-of-your-computational-challen').type('Testing');
    cy.get('#edit-what-have-you-tried-so-far-to-solve-this-challenge-').type('testing');
    cy.get('#edit-my-institution-wasn-t-listed').check();
    cy.contains('Institution');
    cy.get('#edit-my-institution-wasn-t-listed').uncheck();
    cy.get('#edit-actions-submit').click();
    cy.contains('New submission added to Distributed Experts Network Help Request Form.');
  });

});
