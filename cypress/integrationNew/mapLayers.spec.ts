import { MAPPAGE, MAP_LAYERS } from '../support/selectorsNew'

describe('map Layers', () => {
  describe('user should be able to see layers', () => {
    beforeEach(() => {
      cy.visit('/data/geozoek')
    })

    it('Should check Afvalcontainers layers', () => {
      cy.get(MAPPAGE.legendaButton).click()
      cy.get(MAPPAGE.drawerContent).should('be.visible')
      cy.checkMapLayerCategory('Afvalcontainers', 'Afvalcontainers')

      cy.checkMapLayer('Restafval', MAP_LAYERS.checkboxAfvalRestafval, 1)
    })
  })
})
