describe('generic test', () => {
  it('tests the page', () => {

    Cypress.on('viewport:changed', (newValue) => {
      Cypress.config('viewportWidth', newValue.viewportWidth)
      Cypress.config('viewportHeight', newValue.viewportHeight)
    })

    cy.visit('/');

    cy.viewport(1980, 1400)

    cy.task("log", ln() + ": config viewportWidth: " + Cypress.config('viewportWidth')) // 1800

    cy.then(() => {
      cy.task('log', ln() + `: viewportWidth: ${viewportWidth}`) // 1800
      cy.task("log", ln() + ": config viewportWidth: " + Cypress.config('viewportWidth')) // 1980

    })

    var viewportWidth = Cypress.config('viewportWidth')
    cy.task('log', ln() + `: viewportWidth: ${viewportWidth}`) // 1800
    cy.task("log", ln() + ": config viewportWidth: " + Cypress.config('viewportWidth')) // viewportWidth: 1800

    cy.viewport(1280, 720)

    viewportWidth = Cypress.config('viewportWidth')
    cy.task('log', ln() + `: width is 1280, before then: viewportWidth: ${viewportWidth}`) // viewportWidth: 1800

    cy.then(() => {
      cy.task("log", ln() + ": width is 1280, after then: config viewportWidth: " + Cypress.config('viewportWidth')) // viewportWidth: 1280
      cy.task('log', ln() + `: viewportWidth: ${viewportWidth}`) // viewportWidth: 1800
    })


    cy.then(() => {
      cy.wrap(Cypress.config('viewportWidth')).should('eq', 1280)  // passes
      cy.wrap(Cypress.config('viewportHeight')).should('eq', 720)  // passes
      cy.task('log', ln() + `: width is 1280, second then: viewportWidth: ${viewportWidth}`) // viewportWidth: 1800
      cy.task('log', ln() + `: width is 1280, second then: config.viewportWidth: "` + Cypress.config('viewportWidth')) // viewportWidth: 1280
    })

  })
})

function ln() {
  var e = new Error();
  if (!e.stack) try {
    // IE requires the Error to actually be throw or else the Error's 'stack'
    // property is undefined.
    throw e;
  } catch (e) {
    if (!e.stack) {
      return 0; // IE < 10, likely
    }
  }
  var stack = e.stack.toString().split(/\r\n|\n/);
  // We want our caller's frame. It's index into |stack| depends on the
  // browser and browser version, so we need to search for the second frame:
  var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
  do {
    var frame = stack.shift();
  } while (!frameRE.exec(frame) && stack.length);
  return frameRE.exec(stack.shift())[1];
}
