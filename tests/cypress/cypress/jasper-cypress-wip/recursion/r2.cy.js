it('yields 7 from the task (limit)', () => {
  const recurse = (commandsFn, checkFn, limit = 3) => {
    if (limit < 0) {
      throw new Error('Recursion limit reached')
    }
    cy.log(`remaining attempts **${limit}**`)

    commandsFn().then((x) => {
      if (checkFn(x)) {
        cy.log('**NICE!**')
        return
      }

      recurse(commandsFn, checkFn, limit - 1)
    })
  }

  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
    30,
  )
})
