import { MAPPAGE } from '../support/selectorsNew'

describe('map page', () => {
  describe('user should be able to use the map', () => {
    beforeEach(() => {
      cy.visit('/data/geozoek')
    })

    it('should render the leaflet map', () => {
      cy.get('.leaflet-container').should('be.visible')
    })

    it('user should be able to switch between satellite images and topographic map', () => {
      cy.get(MAPPAGE.baseLayerToggle).should('be.visible')

      cy.get(MAPPAGE.baseLayerToggle).click()
      cy.url().should('include', 'achtergrond=lf2020')
    })

    it('user should be able to toggle the legend drawer', () => {
      cy.get(MAPPAGE.legendaButton).should('be.visible')
      cy.get(MAPPAGE.drawerContent).should('not.be.visible')
      cy.get(MAPPAGE.legendaButton).click()
      cy.get(MAPPAGE.drawerContent).should('be.visible')
    })
  })
})
