describe("News Page checks", () => {

  it("A MGHPCC news page shows title date and byline", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/news');
    cy.contains('News');
    cy.contains('Published Articles');
    cy.contains('Press Releases');
    cy.contains('+ Press Release').should('not.exist');
    cy.contains('+ Published Article').should('not.exist')
  });

  it("A MGHPCC news page shows title date and byline", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/news/article/mghpcc-explores-strategies-sc21-increase-hpc-access-and-collaboration');
    cy.contains('MGHPCC Explores Strategies');
    cy.contains('Nov 12, 2021');
    cy.contains('John Goodhue, will be co-leading another BOF session');
  });

  it("A specific press release shows expected title", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/news/press/tools-expand-high-performance-research-computing-be-explored-regional-conference');
    cy.contains('Tools to Expand High Performance');
  });

});
