/*
    qa-bot shadow DOM verification test
    Verifies that the qa-bot component has properly instantiated inside shadow DOM
*/
describe("qa-bot shadow DOM instantiation", () => {
  it("Should verify qa-bot is properly instantiated in shadow DOM", () => {
    cy.visit("/");
    
    // Wait for qa-bot to initialize
    cy.wait(3000);

    // Check that qa-bot element exists
    cy.get('#qa-bot').should('exist');

    // Verify shadow DOM structure and functionality
    cy.get('#qa-bot').then(($el) => {
      const element = $el[0];
      const shadowRoot = element.shadowRoot;
      
      // 1. Verify shadow root exists
      expect(shadowRoot, 'Shadow root should exist').to.not.be.null;
      
      // 2. Check for .qa-bot element in shadow DOM
      const qaBotElement = shadowRoot.querySelector('.qa-bot');
      expect(qaBotElement, '.qa-bot element should exist in shadow DOM').to.not.be.null;
      
      // 3. Verify it has interactive elements (buttons)
      const buttons = shadowRoot.querySelectorAll('button');
      expect(buttons.length, 'Should have at least one button for interaction').to.be.greaterThan(0);
      
      // 4. Verify shadow DOM has meaningful content
      expect(shadowRoot.innerHTML.length, 'Shadow DOM should have content').to.be.greaterThan(50);
    });
  });
});