describe("Test news as unauthenticated user", () => {

  it("News page displays Articles and Releases", () => {
    cy.visit('/news');
    cy.contains('News');
    cy.contains('Published Articles');
    cy.contains('Press Releases')
  });

  it("A MGHPCC news page shows title date and byline", () => {
    cy.visit('/news/article/mghpcc-explores-strategies-sc21-increase-hpc-access-and-collaboration');
    cy.contains('MGHPCC Explores Strategies');
    cy.contains('Nov 12, 2021');
    cy.contains('John Goodhue, will be co-leading another BOF session');
  });

  it("A specific press release shows expected title", () => {
    cy.visit('/news/press/tools-expand-high-performance-research-computing-be-explored-regional-conference');
    cy.contains('Tools to Expand High Performance');
  });

});
