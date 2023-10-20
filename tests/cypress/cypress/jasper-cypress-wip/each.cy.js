describe('Report broken links', () => {
  it('looks for broken links', () => {

    var genArr = Array.from({ length: 15 }, (v, k) => k + 1)
    cy.wrap(genArr).each((index) => {
      cy.log("index =" + index)
    })
  })
})
