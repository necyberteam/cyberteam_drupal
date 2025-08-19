describe('Campus Champions Mentorship Slider', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the mentorship carousel with correct Campus Champions branding', () => {
    cy.get('#block-champions-views-block-mentorship-facet-search-block-1, #block-champions-views-block-mentorship-facet-search-block-1-2')
      .should('exist')
      .and('be.visible');
    
    cy.get('#block-champions-views-block-mentorship-facet-search-block-1 header h2, #block-champions-views-block-mentorship-facet-search-block-1-2 header h2')
      .should('contain.text', 'Campus Champions NAIRR AI Mentorships');
    
    cy.get('#block-champions-views-block-mentorship-facet-search-block-1 header p, #block-champions-views-block-mentorship-facet-search-block-1-2 header p')
      .should('contain.text', 'The Campus Champions AI mentorship program connects');
  });

  it('should display carousel with mentorship content', () => {
    cy.get('#mentor-slider .carousel-item')
      .should('exist')
      .and('have.length.greaterThan', 0);
    
    cy.get('#mentor-slider .carousel-item.active')
      .should('exist');
    
    // Check mentorship content exists
    cy.get('#mentor-slider .carousel-item .views-field h2 a')
      .should('exist');
  });

  it('should display footer with Campus Champions specific content', () => {
    cy.get('#block-champions-views-block-mentorship-facet-search-block-1 footer a.btn, #block-champions-views-block-mentorship-facet-search-block-1-2 footer a.btn')
      .should('contain.text', 'See All')
      .and('have.attr', 'href', 'https://ccmnet.org/mentorships?f%5B0%5D=mentorship_program%3A910');
    
    // Check CCMNet logo
    cy.get('#block-champions-views-block-mentorship-facet-search-block-1 footer img[alt="CCMNET Logo"], #block-champions-views-block-mentorship-facet-search-block-1-2 footer img[alt="CCMNET Logo"]')
      .should('exist')
      .and('have.attr', 'src')
      .and('include', 'CCMNet-logo.svg');
    
    // Check "Powered by CCMNet" text and link
    cy.get('#block-champions-views-block-mentorship-facet-search-block-1 footer a[href="https://ccmnet.org"], #block-champions-views-block-mentorship-facet-search-block-1-2 footer a[href="https://ccmnet.org"]')
      .should('contain.text', 'CCMNet');
  });

  it('should navigate between carousel items', () => {
    cy.get('#mentor-slider .carousel-item').then(($items) => {
      if ($items.length > 1) {
        cy.get('#mentor-slider .carousel-control-next').click();
        cy.wait(500);
        cy.get('#mentor-slider .carousel-item.active').should('exist');
      }
    });
  });
});