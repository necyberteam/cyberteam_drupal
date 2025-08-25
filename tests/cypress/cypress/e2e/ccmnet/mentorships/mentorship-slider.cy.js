describe('CCMNet Mentorship Slider', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the mentorship carousel with correct CCMNet branding', () => {
    cy.get('.bg-ccmnet-navy.slider')
      .should('exist')
      .and('be.visible');
    
    cy.get('.bg-ccmnet-navy.slider header h2')
      .should('contain.text', 'Featured Mentorships');
    
    // Should NOT have Campus Champions specific text
    cy.get('.bg-ccmnet-navy.slider header')
      .should('not.contain.text', 'Campus Champions NAIRR AI Mentorships');
  });

  it('should display carousel with mentorship content', () => {
    cy.get('#mentor-slider-2 .carousel-item')
      .should('exist')
      .and('have.length.greaterThan', 0);
    
    cy.get('#mentor-slider-2 .carousel-item.active')
      .should('exist');
    
    // Check mentorship content exists
    cy.get('#mentor-slider-2 .carousel-item .views-field h2 a')
      .should('exist');
  });

  it('should display correct footer content', () => {
    cy.get('.bg-ccmnet-navy.slider footer a.btn')
      .should('contain.text', 'See All');
    
    // Should NOT have Campus Champions specific elements
    cy.get('.bg-ccmnet-navy.slider footer')
      .should('not.contain.text', 'Powered by CCMNet');
    
    cy.get('.bg-ccmnet-navy.slider footer img[alt="CCMNET Logo"]')
      .should('not.exist');
  });

  it('should navigate between carousel items', () => {
    cy.get('#mentor-slider-2 .carousel-item').then(($items) => {
      if ($items.length > 1) {
        cy.get('#mentor-slider-2 .carousel-control-next').click();
        cy.wait(500);
        cy.get('#mentor-slider-2 .carousel-item.active').should('exist');
      }
    });
  });
});