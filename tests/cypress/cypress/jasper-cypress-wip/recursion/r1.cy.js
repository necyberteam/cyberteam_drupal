import { recurse } from 'cypress-recurse'

it('gets 7', () => {
  recurse(
    () => cy.task('randomNumber'),
    (n) => n === 7,
  )
})
