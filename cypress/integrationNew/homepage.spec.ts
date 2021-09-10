import { HOMEPAGE, MAPPAGE } from '../support/selectorsNew'

describe('Homepage module', () => {
  describe(`Navigation Card Block `, () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should have link to the mappage', () => {
      cy.get(HOMEPAGE.navigationCardKaart).should('be.visible')
      cy.get(HOMEPAGE.navigationCardKaart).click()
      cy.get(MAPPAGE.legendaButton).should('be.visible')
    })

    it('should have link to the publications search page ', () => {
      cy.get(HOMEPAGE.navigationCardPublicaties).should('be.visible')
      cy.get(HOMEPAGE.navigationCardPublicaties).click()
    })

    // etc..
  })
})
