describe("For anonymous & authenticated user, the Menu Items test.", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display menu items', () => {
    cy.contains('About Us');
    cy.contains('Community');
    cy.contains('Get Help');
    cy.contains('Projects');
  });

  it('should navigate to Get Help page', () => {
    cy.contains('Get Help').click();
    cy.contains('Get Research Computing Help');
  });

  it('should navigate to Projects page', () => {
    cy.contains('Projects').click();
    cy.contains('Project');
  });

  it('should navigate to Tags page', () => {
    cy.get(':nth-child(7) > .hide-ccmnet').contains('Tags').click();
    cy.contains('Tags');
  });
});

context('Authenticated user', () => {
  beforeEach(() => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/');
  });

  it('should display menu items', () => {
    cy.contains('About Us');
    cy.contains('Community');
    cy.contains('Get Help');
    cy.contains('Projects');
  });

  it('should navigate to Get Help page', () => {
    cy.contains('Get Help').click();
    cy.contains('Get Research Computing Help');
  });

  it('should navigate to Projects page', () => {
    cy.contains('Projects').click();
    cy.contains('Project');
  });

  it('should navigate to Tags page', () => {
    cy.get(':nth-child(7) > .hide-ccmnet').contains('Tags').click();
    cy.contains('Tags');
  });
});

