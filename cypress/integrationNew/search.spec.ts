import { SEARCH } from '../support/selectorsNew'

describe('search', () => {
  describe('user should be able to use the searchbar', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should render the search form', () => {
      cy.get(SEARCH.searchInput).should('be.visible')
    })
  })
})
