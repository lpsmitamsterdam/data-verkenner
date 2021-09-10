import { HOMEPAGE } from '../support/selectorsNew'

describe('Homepage module', () => {
  describe(`Navigation Card Block `, () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should have link to the mappage', () => {
      cy.get(HOMEPAGE.navigationCardKaart).should('be.visible')
    })
  })
})
